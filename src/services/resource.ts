/**
 * 用户相关请求模块
 */

import request from '@/utils/request'


export const getResourcePages = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/resource/getResourcePages',
    data
  })
}

export const getAllResources = () => {
  return request({
    method: 'GET',
    url: '/boss/resource/getAll'
  })
}

export const allocateRoleResources = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/resource/allocateRoleResources',
    data
  })
}

export const getRoleResources = (roleId: string | number) => {
  return request({
    method: 'GET',
    url: '/boss/resource/getRoleResources',
    params: {
      roleId
    }
  })
}

export const getResourceCategories = () => {
  return request({
    method: 'GET',
    url: '/boss/resource/category/getAll'
  })
}

export const saveOrUpdate = (data:any) => {
  return request({
    method: 'POST',
    url: '/boss/resource/saveOrUpdate',
    data
  })
}
export const getResById = (id:string) => {
  return request({
    method: 'GET',
    url: `/boss/resource/${id}`
  })
}
export const deleteResById = (id:string) => {
  return request({
    method: 'DELETE',
    url: `/boss/resource/${id}`
  })
}


