/*
 * @Author: 王欣磊
 * @Date: 2021-03-13 09:24:52
 * @LastEditors: 王欣磊
 * @LastEditTime: 2021-09-15 15:57:28
 * @Description:
 * @FilePath: /jsmsa-report/src/store/getters.js
 */
const getters = {
  isMobile: state => state.app.isMobile,
  lang: state => state.app.lang,
  theme: state => state.app.theme,
  color: state => state.app.color,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  nickname: state => state.user.name,
  username: state => state.user.name,
  welcome: state => state.user.welcome,
  roles: state => state.user.roles,
  userInfo: state => state.user.info,
  addRouters: state => state.permission.addRouters,
  multiTab: state => state.app.multiTab,

  // report
  printReportItem: state => state.report.printReportItem,
  // report
  templateReportItem: state => state.report.templateReportItem,

  // forceSearch
  forceSearch: state => state.forceSearch,

  // title
  domTitle: state => state.app.domTitle,
  domTitleItem: state => state.app.domTitleItem,
  appEnv: state => state.app.domTitleItem && state.app.domTitleItem.code || '',
  statData: state => state.statistic.statisticData
}

export default getters
