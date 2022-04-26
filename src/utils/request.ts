import axios, { AxiosError } from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import router from '@/router'
import qs from 'qs'

const request = axios.create({
  timeout: 8000
})

function redirectLogin(){
  return router.push({
    name:'login',
    query:{
      redirect:router.currentRoute.fullPath
    }
  })
}
request.interceptors.request.use(requestConfig => {
  // console.log({ requestConfig })
  if (
    store.state.user &&
    store.state.user.access_token &&
    requestConfig &&
    requestConfig.headers
  ) {
    requestConfig.headers.Authorization = store.state.user.access_token
  }
  return requestConfig
})

let isRefreshing = false;
let errorQueue:unknown[] = [];

request.interceptors.response.use(response => {
  // http 响应码 2xx 的走这个方法
  if (response.data.state && response.data.state !== 1) {
    // 响应结果不正常
    Message.error(response.data.message)
  }
  return response
}, async error => {
  // http 响应码 2xx 以外的走这个方法
  if (error.response) {
    // 请求发出后且收到响应
    const { status } = error.response
    let refreshResp;
    switch (status) {
      case 401: // Unauthorized 未登录或 token 过期
        // token 不存在，跳转登录页面
        if (!store.state.user){
          return redirectLogin()
        }
        if (isRefreshing){
          errorQueue.push(error)
          return
        }
        Message.info('token 过期，刷新中...');
        // refresh token
        try {
          isRefreshing = true;
          refreshResp = await axios.create()({
            url:'/front/user/refresh_token',
            method:'POST',
            data:qs.stringify({refreshtoken:store.state.user.refresh_token})
          });
          isRefreshing = false;
          if (refreshResp.data.content){
            // refresh token 成功，更新到容器中，并重新发送之前的请求
            store.commit('setUser',refreshResp.data.content)
            errorQueue.unshift(error)
            const ret = Promise.all(
              errorQueue.map(error=>request((error as AxiosError).config))
            )
            errorQueue = [];
            return ret
          } else {
            errorQueue = [];
            // refresh failed 跳转登录页面
            return redirectLogin()
          }
        } catch (e){
          // refresh failed 跳转登录页面
          store.commit('setUser',null)
          return redirectLogin()
        } finally {
          isRefreshing = false
        }
      case 400: // 参数错误
        Message.error('请求参数有误')
        break;
      case 403: // 无权限
        Message.error('无权限')
        break;
      case 404:
        Message.error('资源不存在')
        break;
      default:
        Message.error('服务端异常')
    }
  } else if (error.request) {
    // 请求发出后没有收到响应
    Message.error('请求发出后没有收到响应')
  } else {
    // 设置请求时触发了一个错误
    Message.error('请求失败：' + error.message)
  }
  return Promise.reject(error)
})
export default request
