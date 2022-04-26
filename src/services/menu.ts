/**
 * 用户相关请求模块
 */

import request from '@/utils/request'


export interface Menu {
  id?:number|string // 菜单ID，更新时须带上传给后台 false
  parentId?:number|string;// 菜单父id true
  name:string // 菜单名称 true
  href:string // 菜单路径 true
  icon?:string // 菜单图标 false
  orderNum?:number // 菜单序号 false
  description?:string // 菜单描述 false
  shown?:boolean // 是否显示 false
}

export const addMenu = (data: Menu) => {
  return request({
    method: 'POST',
    url: '/boss/menu/saveOrUpdate',// 请求数据类型 application/json
    // 如果 data 是普通对象，则 Content-Type 是 application/json
    // 如果 data 是 qs.stringify(data) 转换之后的数据：key=value&key=value，
    // 则 Content-Type 会被设置为 application/x-www-form-urlencoded
    // 如果 data 是 FormData 对象，则 Content-Type 是 multipart/form-data
    data // axios 默认发送的是 application/json 格式的数据
  })
}

/**
 * 菜单相关请求模块
 */

export const createOrUpdateMenu = (data: Menu) => {
  return request({
    method: 'POST',
    url: '/boss/menu/saveOrUpdate',
    data
  })
}

export const getEditMenuInfo = (id: string | number = -1) => {
  return request({
    method: 'GET',
    url: '/boss/menu/getEditMenuInfo',
    params: {
      id
    }
  })
}

export const getAllMenus = () => {
  return request({
    method: 'GET',
    url: '/boss/menu/getAll'
  })
}

export const deleteMenu = (id: number|string) => {
  return request({
    method: 'DELETE',
    url: `/boss/menu/${id}`
  })
}

export const getMenuNodeList = () => {
  return request({
    method: 'GET',
    url: '/boss/menu/getMenuNodeList'
  })
}

export const allocateRoleMenus = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/menu/allocateRoleMenus',
    data
  })
}

export const getRoleMenus = (roleId: string | number) => {
  return request({
    method: 'GET',
    url: '/boss/menu/getRoleMenus',
    params: { // axios 会把 params 转换为 key=value&key=value 的数据格式放到 url 后面(以?分割)
      roleId
    }
  })
}

