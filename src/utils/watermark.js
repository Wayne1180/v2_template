/*
 * @Author: 王欣磊
 * @Date: 2022-05-18 14:55:08
 * @LastEditors: 王欣磊
 * @LastEditTime: 2022-05-18 14:59:23
 * @Description:
 * @FilePath: /bianjian-ship/src/utils/watermark.js
 */
const setWatermark = (str1, str2) => {
    const id = '1.23452384164.123412415'

    if (document.getElementById(id) !== null) {
        document.body.removeChild(document.getElementById(id))
    }

    const can = document.createElement('canvas')
    // 设置canvas画布大小
    can.width = 220
    can.height = 80

    const cans = can.getContext('2d')
    cans.rotate(-20 * Math.PI / 180) // 水印旋转角度
    cans.font = '15px Vedana'
    cans.fillStyle = '#666666'
    cans.textAlign = 'center'
    cans.textBaseline = 'Middle'
    cans.fillText(str1, can.width / 2, can.height) // 水印在画布的位置x，y轴
    cans.fillText(str2, can.width / 2, can.height + 22)

    const div = document.createElement('div')
    div.style.zIndex = 0
    div.id = id
    div.style.pointerEvents = 'none'
    div.style.top = '40px'
    div.style.left = '0px'
    div.style.opacity = '0.13'
    div.style.position = 'fixed'
    div.style.width = '100vw'
    div.style.height = 'calc(100vh - 40px)'
    div.style.background = 'url(' + can.toDataURL('image/png') + ') left top repeat'
    document.body.appendChild(div)
    return id
}

// 添加水印方法
export const setWaterMark = (str1, str2) => {
    let id = setWatermark(str1, str2)
    if (document.getElementById(id) === null) {
        id = setWatermark(str1, str2)
    }
}

// 移除水印方法
export const removeWatermark = () => {
    const id = '1.23452384164.123412415'
    if (document.getElementById(id) !== null) {
        document.body.removeChild(document.getElementById(id))
    }
}
