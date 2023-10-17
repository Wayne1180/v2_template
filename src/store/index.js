/*
 * @Author: 王欣磊
 * @Date: 2021-03-13 09:24:52
 * @LastEditors: 王欣磊
 * @LastEditTime: 2021-09-15 15:57:06
 * @Description:
 * @FilePath: /jsmsa-report/src/store/index.js
 */
import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import user from './modules/user'

// default router permission control
import permission from './modules/permission'

// report
import report from './modules/report'

// stat
import statistic from './modules/statistic'

// dynamic router permission control (Experimental)
// import permission from './modules/async-router'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    user,
    permission,
    report,
    statistic
  },
  state: {
    forceSearch: false
  },
  mutations: {
    'FORCE_SEARCH': (state, data) => {
      state.forceSearch = data
    }
  },
  actions: {},
  getters
})
