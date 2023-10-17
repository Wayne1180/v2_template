/*
 * @Author: 王欣磊
 * @Date: 2021-06-07 11:30:18
 * @LastEditors: 王欣磊
 * @LastEditTime: 2022-09-09 10:24:26
 * @Description:
 * @FilePath: /antd-pro-min/src/config/router.config.js
 */
// eslint-disable-next-line
import { UserLayout, BasicLayout, BlankLayout } from '@/layouts'

const RouteView = () => import('@/layouts/RouteView')
export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: 'menu.home' },
    redirect: '/setting',
    children: [
      {
        path: '/setting',
        name: 'setting',
        icon: 'Setting',
        meta: { title: '综合展示' },
        component: RouteView,
        children: [
          {
            path: '',
            name: 'userSetting',
            meta: { title: '用户管理' },
            component: () => import('@/views/setting/user/index')
          },
          {
            path: '',
            name: 'orgSetting',
            meta: { title: '部门名称设置' },
            component: () => import('@/views/setting/org/index')
          }
        ]
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  },
  {
    path: '/login',
    component: BlankLayout,
    meta: { title: '登录' },
    children: [
      {
        path: '',
        name: 'login',
        component: () => import(/* webpackChunkName: "login" */ '@/views/login/index'),
        meta: { title: '登录' }
      }
    ]
  }
]
