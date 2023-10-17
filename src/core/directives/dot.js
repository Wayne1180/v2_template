/*
 * @Author: 王欣磊
 * @Date: 2021-03-13 09:24:52
 * @LastEditors: 王欣磊
 * @LastEditTime: 2021-06-21 13:36:17
 * @Description:
 * @FilePath: /ship-face/src/core/directives/dot.js
 */
import Vue from 'vue'
const dot = Vue.directive('dot', function (el, binding, vnode) {
    const num = binding.value || 0
    const dom = el.childNodes
    for (var i = 0; i < dom.length; i++) {
        if (dom[i].id === 'dotDom') {
            el.removeChild(dom[i])
        }
    }
    if (num) {
        el.style.position = 'relative'
        const dom = document.createElement('div')
        dom.id = 'dotDom'
        dom.style.width = '20px'
        dom.style.height = '20px'
        dom.style.fontSize = '12px'
        dom.style.color = '#fff'
        dom.style.borderRadius = '10px'
        dom.style.top = '-10px'
        dom.style.right = '-10px'
        dom.style.position = 'absolute'
        const numDom = document.createElement('div')
        numDom.innerText = num > 98 ? '99+' : num
        num > 98 && (numDom.style.transform = 'scale(0.83)')
        dom.appendChild(numDom)
        dom.style.background = '#E8420D'
        dom.classList.add(['flex-center'])
        el.appendChild(dom)
    }
})

export default dot
