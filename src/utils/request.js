/*
 * @Author: 王欣磊
 * @Date: 2021-03-13 09:24:52
 * @LastEditors: 王欣磊
 * @LastEditTime: 2022-10-09 11:59:11
 * @Description:
 * @FilePath: /ant-pro-admin-min/src/utils/request.js
 */
import message from 'ant-design-vue/es/message'
import axios from 'axios'
import store from '@/store'
import storage from 'store'
import notification from 'ant-design-vue/es/notification'
import { VueAxios } from './axios'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import forIn from 'lodash/forIn'

// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 10000 // 请求超时时间
})

// 异常拦截处理器
const errorHandler = (error) => {
  message.destroy()
  if (error.response) {
    const data = error.response.data
    // 从 localstorage 获取 token
    const token = storage.get(ACCESS_TOKEN)
    if (error.response.status === 403) {
      notification.error({
        message: 'Forbidden',
        description: data.message
      })
    }
    if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
      notification.error({
        message: 'Unauthorized',
        description: 'Authorization verification failed'
      })
      if (token) {
        // store.dispatch('Logout').then(() => {
        //   setTimeout(() => {
        //     window.location.reload()
        //   }, 1500)
        // })
      }
    }
  } else {
    message.error('网络请求失败')
    console.error('网络请求失败 ------> ', error)
    return Promise.resolve({ code: -1 })
  }
  return Promise.reject(error)
}

// request interceptor
request.interceptors.request.use((config) => {
  // bool -> 0/1
  forIn(config.params, (v, k) => {
    if (v === true) {
      config.params[k] = 1
    }
    if (v === false) {
      config.params[k] = 0
    }
  })
  // number -> string
  forIn(config.data, (v, k) => {
    if (typeof v === 'number') {
      config.data[k] = v.toString()
    }
  })

  const token = storage.get(ACCESS_TOKEN)
  // 如果 token 存在
  // 让每个请求携带自定义 token 请根据实际情况自行修改
  if (token) {
    config.headers['Authorization'] = token
  }
  return config
}, errorHandler)

// response interceptor
request.interceptors.response.use((response) => {
  if (response.request.responseType === 'blob') {
    return response
  }

  const token = storage.get(ACCESS_TOKEN)
  //
  if (response.data.code === 6001) {
    notification.error({
      message: 'Unauthorized',
      description: 'Authorization verification failed'
    })
    if (token) {
      store.dispatch('Logout').then(() => {
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      })
    }
  }
  if (response.headers['content-disposition']) {
    response.data.fileName = response.headers['content-disposition']
  }
  if (response.headers['content-type']) {
    response.data.contentType = response.headers['content-type']
  }
  // 统一错误播报message
  if (response.data.code !== 200) {
    // console.error(response)
    if (
      response.config.responseType !== 'blob' &&
      response.config.responseType !== 'arraybuffer' &&
      !response.config.noMessage
    ) {
      message.error(response.data.message || '未知错误')
    }
  }
  return response.data
}, errorHandler)

const installer = {
  vm: {},
  install (Vue) {
    Vue.use(VueAxios, request)
  }
}
const mockable = (url) => {
  return process.env.VUE_APP_MOCK_URL ? process.env.VUE_APP_MOCK_URL + process.env.VUE_APP_API_BASE_URL + url : url
}
export default request

export { installer as VueAxios, request as axios, mockable }
