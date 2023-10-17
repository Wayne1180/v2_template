/*
 * @Author: 王欣磊
 * @Date: 2021-03-23 14:05:29
 * @LastEditors: 王欣磊
 * @LastEditTime: 2022-05-11 14:36:53
 * @Description:
 * @FilePath: /bianjian-ship/src/utils/canvasUtil.js
 */
import guid from './guid'
import some from 'lodash/some'
import JSZip from 'jszip'
import { getStrFullLength } from '@/components/_util/util'
import { getEnumName } from '@/config/enum.config'
import chroma from 'chroma-js'
/// es/notification
/**
 * 绘制特征框图
 *
 * @export
 * @param {*} src
 * @param {*} featureLabelList
 * @returns
 */
export function getBase64WithFeatures (src, featureLabelList, isName = false) {
  return new Promise((resolve, reject) => {
    var cas = document.createElement('canvas')
    var ctx = cas.getContext('2d')
    var img = new Image()
    // 跨域
    img.crossOrigin = 'Anonymous'
    // 加载
    img.onload = function () {
      cas.width = img.width
      cas.height = img.height
      ctx.drawImage(img, 0, 0)

      for (const feature of featureLabelList) {
        if (!feature.points || !feature.points.length || some(feature.points, (o) => o < 0)) {
          continue
        }
        // 点
        const x = feature.points[0]
        const y = feature.points[1]
        const width = feature.points[2] - feature.points[0]
        const height = feature.points[3] - feature.points[1]
        const color = isName
          ? { fill: 'rgb(66, 83, 45)', stroke: 'rgb(66, 83, 45)' }
          : getEnumName('common.featureColor', feature.name)
        if (!isName && !getEnumName('common.featureColor', feature.name)) {
          continue
        }
        ctx.strokeStyle = color.stroke.replace(/\)/g, ',0.6)')
        ctx.lineWidth = 4
        // 框
        ctx.strokeRect(x, y, width, height)
        ctx.font = isName ? '60px 宋体' : '30px 宋体'
        ctx.fillStyle = color.fill.replace(/\)/g, ',1)')
        ctx.textAlign = 'left'
        // 背景
        ctx.fillRect(
          x - 4,
          y < (isName ? 70 : 40) ? y + height + (isName ? 70 : 40) : y,
          ((isName ? 60 : 30) * (isName ? getStrFullLength(feature.label) : getStrFullLength(feature.name))) / 2 + 20,
          isName ? -70 : -40
        )
        const luminance = chroma(color.fill.replace(/\)/g, ',1)').replace(/rgb/, 'rgba'))?.luminance() || 0.2

        ctx.fillStyle = luminance >= 0.2 ? '#000' : '#fff'
        // 字
        ctx.fillText(
          (feature.name === '二维码' || feature.name === '船名' ? feature.label : feature.name) || '',
          x + 5,
          y < (isName ? 70 : 40) ? y + height + (isName ? 70 : 40) - 10 : y - 5
        )
      }

      const res = cas.toDataURL('image/png', 1)
      //
      resolve(res)
    }
    img.onerror = () => {
      reject(Error('图片下载失败'))
    }
    img.src = src
  })
}
/**
 *
 * 打水印的函数
 * @export
 * @param {String} src 单个文件链接
 * @param {Array} lines 文字行(数组)
 * @returns promise - 处理后的图片base
 */
export function getBase64WithWatermark (src, lines) {
  return new Promise((resolve, reject) => {
    var cas = document.createElement('canvas')
    var ctx = cas.getContext('2d')
    var img = new Image()
    // 跨域
    img.crossOrigin = 'Anonymous'
    img.onload = function () {
      cas.width = img.width
      cas.height = img.height
      ctx.drawImage(img, 0, 0)
      let bottom = 0
      for (const text of lines) {
        // 设置填充字号和字体，样式
        ctx.font = '24px 宋体'
        ctx.fillStyle = '#fff'
        // 设置右对齐
        ctx.textAlign = 'right'
        // 在指定位置绘制文字，这里指定距离右下角20坐标的地方
        ctx.fillText(text, cas.width - 20, cas.height - 20 - bottom)
        bottom += 25
      }

      const res = cas.toDataURL('image/png', 1)
      //
      resolve(res)
    }
    img.onerror = () => {
      reject(Error('图片下载失败'))
    }
    img.src = src
  })
}
/**
 *
 * 打水印并下载的函数(不支持IE)
 * @export
 * @param {*} srcList 下载图片的链接
 * @param {*} lines 水印文字行(数组)
 */
export function downloadZip (list, lineKeys = []) {
  return new Promise((resolve, reject) => {
    const promises = []
    for (const item of list) {
      const lines = []
      lineKeys.forEach((i) => {
        lines.push(item[i])
      })
      promises.push(getBase64WithWatermark(item.imgUrl, lines))
    }
    Promise.all(promises)
      .then((base64s) => {
        // eslint-disable-next-line no-undef
        var zip = new JSZip()
        base64s.forEach(function (b, i) {
          zip
            .folder('打包图片')
            .file(
              '导出图片_' + (list[i].matchShipName || '') + '_' + guid(5) + '.png',
              b.replace(/data:image\/png;base64/, ''),
              { base64: true }
            )
        })
        // 生成zip文件并下载
        zip
          .generateAsync({
            type: 'blob'
          })
          .then(function (content) {
            // 下载的文件名
            var filename = '打包图片' + '.zip'
            // 创建隐藏的可下载链接
            var eleLink = document.createElement('a')
            eleLink.download = filename
            eleLink.style.display = 'none'
            // 下载内容转变成blob地址
            eleLink.href = URL.createObjectURL(content)
            // 触发点击
            document.body.appendChild(eleLink)
            eleLink.click()
            // 然后移除
            document.body.removeChild(eleLink)
            resolve('success')
          })
      })
      .catch((e) => {
        reject(e)
      })
  })
}
