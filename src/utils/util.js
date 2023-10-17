/*
 * @Author: 王欣磊
 * @Date: 2021-03-13 09:24:52
 * @LastEditors: 王欣磊
 * @LastEditTime: 2022-06-10 16:09:13
 * @Description:
 * @FilePath: /bianjian-ship/src/utils/util.js
 */
import _ from 'lodash'
import nationCode from './nationCode.json'
import { MMSI } from 'mmsi.js'
export function timeFix () {
  const time = new Date()
  const hour = time.getHours()
  return hour < 9 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 20 ? '下午好' : '晚上好'
}

export function welcome () {
  const arr = ['休息一会儿吧', '准备吃什么呢?', '要不要打一把 DOTA', '我猜你可能累了']
  const index = Math.floor(Math.random() * arr.length)
  return arr[index]
}

/**
 * 触发 window.resize
 */
export function triggerWindowResizeEvent () {
  const event = document.createEvent('HTMLEvents')
  event.initEvent('resize', true, true)
  event.eventType = 'message'
  window.dispatchEvent(event)
}

export function handleScrollHeader (callback) {
  let timer = 0

  let beforeScrollTop = window.pageYOffset
  callback = callback || function () {}
  window.addEventListener(
    'scroll',
    (event) => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        let direction = 'up'
        const afterScrollTop = window.pageYOffset
        const delta = afterScrollTop - beforeScrollTop
        if (delta === 0) {
          return false
        }
        direction = delta > 0 ? 'down' : 'up'
        callback(direction)
        beforeScrollTop = afterScrollTop
      }, 50)
    },
    false
  )
}

export function isIE () {
  const bw = window.navigator.userAgent
  const compare = (s) => bw.indexOf(s) >= 0
  const ie11 = (() => 'ActiveXObject' in window)()
  return compare('MSIE') || ie11
}

/**
 * Remove loading animate
 * @param id parent element id or class
 * @param timeout
 */
export function removeLoadingAnimate (id = '', timeout = 1500) {
  if (id === '') {
    return
  }
  setTimeout(() => {
    document.body.removeChild(document.getElementById(id))
  }, timeout)
}
export function scorePassword (pass) {
  let score = 0
  if (!pass) {
    return score
  }
  // award every unique letter until 5 repetitions
  const letters = {}
  for (let i = 0; i < pass.length; i++) {
    letters[pass[i]] = (letters[pass[i]] || 0) + 1
    score += 5.0 / letters[pass[i]]
  }

  // bonus points for mixing it up
  const variations = {
    digits: /\d/.test(pass),
    lower: /[a-z]/.test(pass),
    upper: /[A-Z]/.test(pass),
    nonWords: /\W/.test(pass)
  }

  let variationCount = 0
  for (var check in variations) {
    variationCount += variations[check] === true ? 1 : 0
  }
  score += (variationCount - 1) * 10

  return parseInt(score)
}

// 获取响应式对象
export function getObserverObject (obj) {
  return JSON.stringify(obj) === '{}' ? null : obj
}
// 验证请求成功
/**
 *
 *
 * @export
 * @param {*} res 返回结果体
 * @param {boolean} [noData=false] 不需要data
 * @returns
 */
export function isResponseValid (res, noData = false) {
  if (res.code === 200 && (res.data !== undefined || noData)) {
    return true
  } else {
    return false
  }
}
export function isArrayValid (a, length = 0) {
  if (a && a.length > length) {
    return true
  } else {
    return false
  }
}
export function checkBe (obj, isPut = false) {
  if (!(typeof obj === 'object')) {
    return obj
  }
  for (var key in obj) {
    if (obj.hasOwnProperty(key) && (obj[key] === null || obj[key] === undefined || obj[key] === '')) {
      if (isPut) {
        obj[key] = null
      } else {
        delete obj[key]
      }
    }
  }
  return obj
}
export function arrayToTree (arr, parentId) {
  //  arr 是返回的数据  parendId 父id

  const temp = []

  const treeArr = arr

  treeArr.forEach((item, index) => {
    // eslint-disable-next-line eqeqeq
    if (item.parentId == parentId) {
      if (arrayToTree(treeArr, treeArr[index].id).length > 0) {
        // 递归调用此函数

        treeArr[index].children = arrayToTree(treeArr, treeArr[index].id)
      }

      temp.push({ ...treeArr[index], key: item.id, title: item.name })
    }
  })

  return temp
}
// 下载blob
export function downloadFileByBlobRes (res, that) {
  if (!res?.data?.size) {
    that.$message.error({ content: '此过滤条件下暂无数据可以导出', duration: 2, key: 'downloadMonitor' })
    return
  }
  if (res.data.type === 'application/json') {
    var reader = new FileReader()
    reader.onload = function (event) {
      const message = JSON.parse(reader.result)?.message
      that.$message.error({ content: message || '下载失败', duration: 2, key: 'downloadMonitor' })
      that.packing = false
    }
    reader.onerror = function (event) {
      that.$message.error({ content: '下载失败', duration: 2, key: 'downloadMonitor' })
      that.packing = false
    }
    reader.readAsText(res.data)
    return
  }
  // 解析blob并下载
  const fileNameDecode =
    decodeURI(res.headers['content-disposition']?.split("filename*=utf-8''")[1].replace(/-/g, '_') || '下载文件.xls') ||
    '下载文件.xls'
  const data = res.data
  const fileName = fileNameDecode
  const blob = new Blob([data], { type: res.data.contentType || 'application/vnd.ms-excel;charset=utf-8' })
  const dom = document.createElement('a')
  const url = window.URL.createObjectURL(blob)

  dom.href = url
  dom.download = decodeURI(fileName)
  dom.style.display = 'none'
  document.body.appendChild(dom)
  dom.click()
  dom.parentNode.removeChild(dom)
  window.URL.revokeObjectURL(url)
  that.$message.success({ content: '下载成功', duration: 2, key: 'downloadMonitor' })
  that.packing = false
}

export function getBase64 (file) {
  // Promise 读取文件base64 资源url
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}
export function getThumbNailUrl (url, reverse = false) {
  // console.log(url)
  //
  if (!url || url.length < 1) {
    // console.error(1)
    return ''
  } else {
    // console.error(url.replace(/(.*)\./, '$1.thumbnail.'))
    return url.replace(/(.*)\./, '$1.thumbnail.')
  }
}
export function getZhNumber (number) {
  const e = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
  let res = ''
  var num = number.replace(/[^0-9]/gi, '$&')
  for (const char of num) {
    res += e[parseInt(char)] || char
  }
  return res
}

export function listToTree (list, tree, parentId, openIds = []) {
  list = _.sortBy(list, 'seq')
  list.forEach((item) => {
    // 判断是否为父级菜单
    // eslint-disable-next-line eqeqeq
    if (item.parentId == parentId) {
      const child = {
        ...item,
        key: item.key || item.name,
        children: []
      }
      if (openIds.includes(item.id)) {
        child.showChildren = true
      }
      // 迭代 list， 找到当前菜单相符合的所有子菜单
      listToTree(list, child.children, item.id, openIds)
      // 删掉不存在 children 值的属性
      if (child.children.length <= 0) {
        delete child.children
      }
      // 加入到树中
      tree.push(child)
    }
  })
}
export function convertTreeNodes (list, openIds = []) {
  const res = []
  listToTree(list, res, 0, openIds)
  return {
    name: '全部点位',
    id: '0',
    showChildren: true,
    children: res
  }
}
export function deleteNull (tree) {
  tree = tree.filter((i) => i !== null)
  tree = tree.map((item) => {
    item.children && (item.children = deleteNull(item.children))
    return item
  })
  return tree
}
export function haveValue (children, key) {
  if (!children) {
    return false
  }
  return children.some((i) => i.name.includes(key) || i.id === key) || children.some((o) => haveValue(o.children, key))
}
export function filterTree (tree, keyword) {
  if (tree) {
    return tree.map((item) => {
      // console.error(item.key,haveValue(item.children,keyword))
      if (item.name.includes(keyword) || item.id === keyword || haveValue(item.children, keyword)) {
        item.children = filterTree(item.children, keyword)
        return item
      } else {
        return null
      }
    })
  } else {
    return null
  }
}
export function getNationDataByMMSI (mmsi) {
  const m = new MMSI(mmsi)?.jurisdiction
  const flagCode = m?.code.split(',').length ? m?.code.split(',')[0].split('-')[0] : m?.code.split('-')[0] || ''
  if (mmsi.toString().startsWith('335')) {
    return {
      code: 'HN',
      flagCode: 'HN',
      enName: 'Honduras',
      name: nationCode['HN'] || '未知'
    }
  }
  if (mmsi.toString().startsWith('550')) {
    return {
      code: 'TL',
      flagCode: 'TL',
      enName: 'Timor-Leste (Democratic Republic of)',
      name: nationCode['TL'] || '未知'
    }
  }
  return { code: m?.code || '', flagCode, enName: m?.name, name: nationCode[flagCode] || '未知' }
}
