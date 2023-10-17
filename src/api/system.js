/*
 * @Author: 王欣磊
 * @Date: 2021-05-26 20:55:45
 * @LastEditors: 王欣磊
 * @LastEditTime: 2022-04-28 16:10:58
 * @Description:
 * @FilePath: /bianjian-ship/src/api/system.js
 */
import request from '@/utils/request'

const api = {
  title: '/user/system'
}

export function getTitle () {
  return request({
    url: api.title,
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
