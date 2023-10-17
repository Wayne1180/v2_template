/*
 * @Author: 王欣磊
 * @Date: 2021-09-15 15:44:44
 * @LastEditors: 王欣磊
 * @LastEditTime: 2021-09-15 15:49:24
 * @Description:
 * @FilePath: /jsmsa-report/src/store/modules/statistic.js
 */
import storage from 'store'
import { STATISTIC_DATA } from '@/store/mutation-types'
const stat = {
  state: {
    statisticData: {
        Summary: {
            date: '',
            infoData: [],
            sumOfYear: [],
            sumThanLastYearIncr: []
        },
        Basic: [],
        Polyline: []
    }

  },
  mutations: {
    [STATISTIC_DATA]: (state, data) => {
      state.statisticData = data
      storage.set(STATISTIC_DATA, data)
    }
  }
}
export default stat
