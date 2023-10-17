/*
 * @Author: 王欣磊
 * @Date: 2021-03-13 09:24:52
 * @LastEditors: 王欣磊
 * @LastEditTime: 2022-09-28 10:29:30
 * @Description:
 * @FilePath: /ant-pro-admin-min/src/utils/domUtil.js
 */
import config from '@/config/defaultSettings'
// import store from '@/store'
// import { DOM_TITLE, DOM_TITLE_ITEM
// } from '@/store/mutation-types'
// import { getTitle } from '@/api/system'
export const setDocumentTitle = function (title) {
  document.title = title
  const ua = navigator.userAgent
  // eslint-disable-next-line
  const regex = /\bMicroMessenger\/([\d\.]+)/
  if (regex.test(ua) && /ip(hone|od|ad)/i.test(ua)) {
    const i = document.createElement('iframe')
    i.src = '/favicon.ico'
    i.style.display = 'none'
    i.onload = function () {
      setTimeout(function () {
        i.remove()
      }, 9)
    }
    document.body.appendChild(i)
  }
}
export const domTitle = config.title
// 获取后端动态title, 需要则取消注释
// getTitle().then(res => {
//  res && res.code === 200 && res.data && res.data.name && store.commit(DOM_TITLE, res.data.name)
//  res && res.code === 200 && store.commit(DOM_TITLE_ITEM, res.data)
// }).catch(() => {
//   store.commit(DOM_TITLE, config.title)
// })
