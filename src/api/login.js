/*
 * @Author: 王欣磊
 * @Date: 2021-03-13 09:24:51
 * @LastEditors: 王欣磊
 * @LastEditTime: 2022-10-09 14:51:24
 * @Description:
 * @FilePath: /ant-pro-admin-min/src/api/login.js
 */
import request from '@/utils/request'

const userApi = {
  Login: '/user/login',
  Logout: '/user/logout',
  ForgePassword: '/auth/forge-password',
  Register: '/auth/register',
  twoStepCode: '/auth/2step-code',
  SendSms: '/account/sms',
  SendSmsErr: '/account/sms_err',
  // get my info
  UserInfo: '/user/info',
  UserMenu: '/user/nav',
  Permission: '/user/permission',
  GetPermissionList: '/shipface/role/permission'
}

/**
 * login func
 * parameter: {
 *     username: '',
 *     password: '',
 *     remember_me: true,
 *     captcha: '12345'
 * }
 * @param parameter
 * @returns {*}
 */
export function ç (parameter) {
  return request({
    url: userApi.Login,
    method: 'post',
    noMessage: true,
    data: parameter
  })
}

export function getSmsCaptcha (parameter) {
  return request({
    url: userApi.SendSms,
    method: 'post',
    data: parameter
  })
}

export function getInfo () {
  return request({
    url: userApi.UserInfo,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function getCurrentUserNav () {
  return request({
    url: userApi.UserMenu,
    method: 'get'
  })
}

export function logout () {
  return request({
    url: userApi.Logout,
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

/**
 * get user 2step code open?
 * @param parameter {*}
 */
export function get2step (parameter) {
  return request({
    url: userApi.twoStepCode,
    method: 'post',
    data: parameter
  })
}

// 获取用户当前权限
export function getPermission () {
  return Promise.resolve({
    code: 200,
    message: 'success',
    data: [
      {
        id: '1',
        createTime: '2020-12-08 01:39:19',
        updateTime: '2021-03-30 18:08:06',
        name: '用户-添加用户',
        url: '/user',
        permExpression: 'user:insert',
        type: 'API',
        method: 'POST',
        sort: 1,
        parentId: 61,
        status: 'ENABLED'
      }
    ]
  })
}
