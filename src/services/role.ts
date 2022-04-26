/**
 * 用户相关请求模块
 */

import request from '@/utils/request'


export const getAllRoles = (data:any) => {
  return request({
    method: 'POST',
    url: '/boss/role/getRolePages',
    data
  })
}
export const getAllOfRoles = () => {
  return request({
    method: 'GET',
    url: '/boss/role/all'
  })
}
export const addOrUpdate = (data:any) => {
  return request({
    method: 'POST',
    url: '/boss/role/saveOrUpdate',
    data
  })
}


export const getRoleById = (id:string|number) => {
  return request({
    method: 'GET',
    url: `/boss/role/${id}`
  })
}
export const deleteRoleById = (id:string) => {
  return request({
    method: 'DELETE',
    url: `/boss/role/${id}`
  })
}


