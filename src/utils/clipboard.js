/*
 * @Author: 王欣磊
 * @Date: 2021-04-25 13:45:12
 * @LastEditors: 王越
 * @LastEditTime: 2021-06-03 10:45:31
 * @Description:
 * @FilePath: \ship-face\src\utils\clipboard.js
 */
import Vue from 'vue'
export function copy (text) {
  Vue.prototype
    .$copyText(text)
    .then(message => {
      Vue.prototype.$message.success('内容已复制剪贴板')
    })
    .catch(err => {
      console.log('copy.err', err)
      Vue.prototype.$message.error('复制失败')
    })
}
