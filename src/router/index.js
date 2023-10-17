/*
 * @Author: 王欣磊
 * @Date: 2021-03-09 10:03:07
 * @LastEditors: 王欣磊
 * @LastEditTime: 2021-03-23 10:31:32
 * @Description:
 * @FilePath: /ship-face/src/router/index.js
 */
import Vue from 'vue'
import Router from 'vue-router'
import { constantRouterMap } from '@/config/router.config'

// hack router push callback
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: constantRouterMap
})
