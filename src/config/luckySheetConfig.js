/*
 * @Author: 王欣磊
 * @Date: 2021-07-19 11:18:20
 * @LastEditors: 王欣磊
 * @LastEditTime: 2021-08-26 14:06:30
 * @Description:
 * @FilePath: /jsmsa-report/src/config/luckySheetConfig.js
 */
const networkConfig = {
    'loadUrl': location.origin + '/api/report/template/sheet',
    'loadSheetUrl': location.origin + '/api/report/loadsheet',
    'updateUrl': 'ws://' + (process.env.NODE_ENV === 'production' ? location.host : '42.193.102.55:7001') + '/api/report/websocket/onlinesheet'

}
const initialConfig = {
    container: 'luckysheet', // 设定DOM容器的id
    lang: 'zh', // 设定表格语言
    showinfobar: false,
    allowUpdate: true,
    gridKey: '0',
    showtoolbar: false,
    showsheetbar: false,
    showtoolbarConfig: {
      numberDecrease: true,
      numberIncrease: true,
      undoRedo: true, // 撤销重做，注意撤消重做是两个按钮，由这一个配置决定显示还是隐藏
      moreFormats: true, // '更多格式'
      font: true, // '字体'
      fontSize: true, // '字号大小'
      bold: true, // '粗体 (Ctrl+B)'
      italic: true, // '斜体 (Ctrl+I)'
      strikethrough: true, // '删除线 (Alt+Shift+5)'
      underline: true, // '下划线 (Alt+Shift+6)'
      textColor: true, // '文本颜色'
      fillColor: true, // '单元格颜色'
      border: true, // '边框'
      mergeCell: true, // '合并单元格'
      textWrapMode: true, // 单元格换行模式
      horizontalAlignMode: true, // '水平对齐方式'
      verticalAlignMode: true, // '垂直对齐方式',
      dataVerification: true, // '数据验证',
      protection: false
    },
    cellRightClickConfig: {
      copyAs: false, // 复制为
      matrix: false, // 矩阵操作选区
      sort: false, // 排序选区
      filter: false, // 筛选选区
      chart: false, // 图表生成
      image: false, // 插入图片
      link: false // 插入链接
    }
  }
export { networkConfig, initialConfig }
