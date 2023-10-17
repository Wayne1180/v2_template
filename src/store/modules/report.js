/*
 * @Author: 王欣磊
 * @Date: 2021-07-28 10:02:08
 * @LastEditors: 王欣磊
 * @LastEditTime: 2021-08-03 17:59:04
 * @Description:
 * @FilePath: /jsmsa-report/src/store/modules/report.js
 */
/*
 * @Author: 王欣磊
 * @Date: 2021-03-19 09:53:03
 * @LastEditors: 王欣磊
 * @LastEditTime: 2021-03-19 12:06:45
 * @Description:
 * @FilePath: /ship-face/src/store/modules/warning.js
 */
import storage from 'store'
import { PRINT_REPORT_ITEM, TEMPLATE_REPORT_ITEM } from '@/store/mutation-types'
const warning = {
  state: {
    printReportItem: {},
    templateReportItem: {}

  },
  mutations: {
    [PRINT_REPORT_ITEM]: (state, data) => {
      state.printReportItem = data
      storage.set(PRINT_REPORT_ITEM, data)
    },
    [TEMPLATE_REPORT_ITEM]: (state, data) => {
      state.templateReportItem = data
      storage.set(TEMPLATE_REPORT_ITEM, data)
    }
  }
}
export default warning
