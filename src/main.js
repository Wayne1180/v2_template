/* eslint-disable vue/component-definition-name-casing */
/*
 * @Author: 王欣磊12312
 * @Date: 2021-03-09 10:03:07
 * @LastEditors: 王欣磊
 * @LastEditTime: 2022-09-28 10:18:43
 * @Description:
 * @FilePath: /ant-pro-admin-min/src/main.js
 */
// with polyfills
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import i18n from './locales'
import { VueAxios } from './utils/request'
import ProLayout, { PageHeaderWrapper } from '@ant-design-vue/pro-layout'
import themePluginConfig from '../config/themePluginConfig'
import { copy } from '@/utils/clipboard.js'

import PageHeader from './components/PageHeader'

// datas,configs
import images from '@/data/images'
import { getOptions, getEnumName } from '@/config/enum.config'

// utils
import guid from './utils/guid.js'
import {
  getObserverObject,
  isResponseValid,
  checkBe,
  isArrayValid,
  downloadFileByBlobRes,
  getThumbNailUrl,
  getNationDataByMMSI
} from './utils/util'
import md5 from '@/utils/md5'
import EventBus from '@/utils/EventBus'

// 3rd party / custom
import ImgPreview from '@/components/ImgPreview'
import VueClipboard from 'vue-clipboard2'
import VueLazyload from 'vue-lazyload'
// import VueVideoPlayer from 'vue-video-player'
import get from 'lodash/get'

// styles
import '../src/styles/commonTable.scss'
import '../src/styles/common.scss'
import '../src/styles/animation.scss'
import '../src/styles/antdHack.scss'

// mock
// WARNING: `mockjs` NOT SUPPORT `IE` PLEASE DO NOT USE IN `production` ENV.
// import './mock'

import bootstrap from './core/bootstrap'
import './core/lazy_use' // use lazy load components
import './permission' // permission control
import './utils/filter' // global filter
import './global.less' // global style

// components
import Ellipsis from '@/components/Ellipsis'
import IconFont from '@/components/IconFont'
import Tree from '@/components/Tree'

Vue.config.productionTip = false
VueClipboard.config.autoSetContainer = true

// mount axios to `Vue.$http` and `this.$http`
Vue.use(VueAxios)
// use pro-layout components
Vue.component('pro-layout', ProLayout)
Vue.component('page-container', PageHeaderWrapper)
Vue.component('page-header-wrapper', PageHeaderWrapper)
Vue.component('page-header', PageHeader)

Vue.use(ImgPreview)

// 3rd party
Vue.use(VueLazyload, {
  preLoad: 1.3,
  // error: images.error,
  attempt: 1,
  adapter: {
    loaded ({ bindType, el, naturalHeight, naturalWidth, $parent, src, loading, error, Init }) {
      // do something here
      // example for call LoadedHandler
      el.style.background = 'unset'
    },
    error ({ bindType, el, naturalHeight, naturalWidth, $parent, src, loading, error, Init }) {
      // .width)
      el.style.background = `${el.dataset.bg || '#fff'} no-repeat center/${
        el.getBoundingClientRect().width < 117 ? '117px' : 'auto'
      } url(${images.error})`
    },
    loading ({ bindType, el, naturalHeight, naturalWidth, $parent, src, loading, error, Init }) {
      el.style.background = `#fff no-repeat center/30px url(${images.loading})`
    }
  }
})
Vue.use(VueClipboard)

// Vue.use(VueVideoPlayer)
Vue.component('ellipsis', Ellipsis)
Vue.component('icon-font', IconFont)
Vue.component('tree', Tree)

Vue.prototype.$md5 = md5
Vue.prototype.$guid = guid
Vue.prototype.$goo = getObserverObject
Vue.prototype.$i = isResponseValid
Vue.prototype.$ia = isArrayValid
Vue.prototype.$cb = checkBe
Vue.prototype.$blob = downloadFileByBlobRes
Vue.prototype.$bus = new EventBus()
Vue.prototype.$opts = getOptions
Vue.prototype.$enumName = getEnumName

Vue.prototype.$copy = copy
Vue.prototype.$tn = getThumbNailUrl
Vue.prototype.$get = get
Vue.prototype.$mmsi = getNationDataByMMSI
window.umi_plugin_ant_themeVar = themePluginConfig.theme

new Vue({
  router,
  store,
  i18n,
  // init localstorage, vuex
  created: bootstrap,
  render: (h) => h(App)
}).$mount('#app')
