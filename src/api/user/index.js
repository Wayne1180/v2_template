/*
 * @Author: 王欣磊
 * @Date: 2022-04-27 17:59:39
 * @LastEditors: 王欣磊
 * @LastEditTime: 2022-04-28 15:19:28
 * @Description:
 * @FilePath: /bianjian-ship/src/api/user/index.js
 */
import request, { mockable } from '@/utils/request'
const api = {
  org: '/user/org',
  user: '/user'
}

export function getOrg (params) {
  return request({
    url: mockable(api.org),
    method: 'get',
    params: params
  })
}

export function putOrg (data) {
  return request({
    url: mockable(api.org),
    method: 'put',
    data: data
  })
}
export function postOrg (data) {
  return request({
    url: mockable(api.org),
    method: 'post',
    data: data
  })
}
export function deleteOrg (data) {
  return request({
    url: mockable(api.org),
    method: 'delete',
    data: data
  })
}
export function getUser (params) {
  return request({
    url: mockable(api.user),
    method: 'get',
    params: params
  })
}
export function putUser (data) {
  return request({
    url: mockable(api.user),
    method: 'put',
    data: data
  })
}
export function postUser (data) {
  return request({
    url: mockable(api.user),
    method: 'post',
    data: data
  })
}
export function deleteUser (data) {
  return request({
    url: mockable(api.user),
    method: 'delete',
    data: data
  })
}
