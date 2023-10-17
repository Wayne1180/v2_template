/*
 * @Author: 王越
 * @date: Do not edit
 * @LastEditors: 王越
 * @LastEditTime: 2021-06-08 15:42:23
 * @Description:
 * @FilePath: \ship-face\src\utils\offset.js
 */
/**
 * @param {Number} width 船框的宽度
 * @param {Number} height 船框的长度
 * @param {Nubmer} rad 偏移弧度,1弧度约为57.30°
 * @param {Number} dot 结果小数位数
 */
 export function offset (height, width, rad = 0, dot = 2) {
   if (height) {
    const offsetY = -((height / 2) - ((height / 2) * Math.cos(rad)))
    const offsetX = ((height / 2) * Math.sin(rad))
    return [offsetX.toFixed(dot), offsetY.toFixed(dot)]
   } else {
     console.error('必须传入船长')
   }
 }
