/*
 * @Author: 王欣磊
 * @Date: 2021-03-09 10:03:07
 * @LastEditors: 王欣磊
 * @LastEditTime: 2021-04-25 13:44:50
 * @Description:
 * @FilePath: /ship-face/src/core/use.js
 */
import Vue from 'vue'

// base library
import Antd from 'ant-design-vue'
import VueCropper from 'vue-cropper'
import 'ant-design-vue/dist/antd.less'

// ext library
import VueClipboard from 'vue-clipboard2'
import MultiTab from '@/components/MultiTab'
import PageLoading from '@/components/PageLoading'
import PermissionHelper from '@/core/permission/permission'
// import '@/components/use'
import './directives/action'

VueClipboard.config.autoSetContainer = true

Vue.use(Antd)
Vue.use(MultiTab)
Vue.use(PageLoading)
Vue.use(VueClipboard)
Vue.use(PermissionHelper)
Vue.use(VueCropper)

process.env.NODE_ENV !== 'production' && console.warn('[antd-pro] WARNING: Antd now use fulled imported.')
