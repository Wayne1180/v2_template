/*
 * @Author: 王欣磊
 * @Date: 2022-04-29 13:39:32
 * @LastEditors: 王欣磊
 * @LastEditTime: 2022-10-08 17:16:46
 * @Description:
 * @FilePath: /ant-pro-admin-min/src/config/enum.config.js
 */
import get from 'lodash/get'
import cloneDeep from 'lodash/cloneDeep'
const enums = {
  common: {
    featureColor: {
      系船柱: { fill: 'rgb(60,0,255)', stroke: 'rgb(60,0,255)' },
      国旗: { fill: 'rgb(255,0,0)', stroke: 'rgb(255,0,0)' },
      烟囱: { fill: 'rgb(255,0,180)', stroke: 'rgb(255,0,180)' },
      空调: { fill: 'rgb(210,0,255)', stroke: 'rgb(210,0,255)' },
      雷达: { fill: 'rgb(20,0,255)', stroke: 'rgb(20,0,255)' },
      塔吊: { fill: 'rgb(0,160,255)', stroke: 'rgb(0,160,255)' },
      救生艇: { fill: 'rgb(0,255,220)', stroke: 'rgb(0,255,220)' },
      锚: { fill: 'rgb(0,255,135)', stroke: 'rgb(0,255,135)' },
      轮胎: { fill: 'rgb(100,255,0)', stroke: 'rgb(100,255,0)' },
      窗户: { fill: 'rgb(240,255,0)', stroke: 'rgb(240,255,0)' },
      门: { fill: 'rgb(255,180,0)', stroke: 'rgb(255,180,0)' },
      探照灯: { fill: 'rgb(255,114,0)', stroke: 'rgb(255,114,0)' },
      二维码: { fill: 'rgb(255,50,0)', stroke: 'rgb(255,50,0)' }
    },
    loadStatus: {
      UNKNOWN: '未知',
      EMPTY_LOAD: '空载',
      HEAVY_LOAD: '重载',
      OVER_LOAD: '超载'
    },
    isControl: [
      { label: '开', value: true },
      { label: '关', value: false }
    ],
    nationality: ['中国', '外籍'],
    aisStatus: [
      { label: '开', value: 1 },
      { label: '关', value: 0 }
    ],
    regPort: [
      '宁德',
      '南通',
      '平潭',
      '潍坊',
      '江阴',
      '盐城',
      '烟台',
      '广州',
      '常熟',
      '无锡',
      '舟山',
      '泉州',
      '深圳',
      '武汉',
      '涪陵',
      '蚌埠',
      '南京',
      '阜阳',
      '宁波',
      '芜湖',
      '上海',
      '天津',
      '嘉兴',
      '扬州',
      '安庆',
      '泰州',
      '淮安',
      '忠县',
      '常州',
      '济宁',
      '淮南',
      '洋浦',
      '信阳',
      '宣城',
      '苏州',
      '铜陵',
      '合肥',
      '张家港',
      '杭州',
      '马鞍山',
      '六安',
      '宿州',
      '台州',
      '岳阳',
      '丹东',
      '徐州',
      '珠海',
      '湖州',
      '滁州',
      '万州',
      '中国上海',
      '亳州',
      '泸州',
      '唐山',
      '福州',
      '驻马店',
      '上海港',
      '连云港',
      '宜昌',
      '南阳',
      '厦门',
      '宜春',
      '佛山',
      '周口',
      '株洲',
      '荆州',
      '丰都',
      '防城港',
      '重庆',
      '青岛',
      '葫芦岛',
      '池州',
      '威海',
      '镇江',
      '绍兴',
      '海口',
      '日照',
      '枣庄',
      '南宁',
      '河源',
      '常德',
      '九江',
      '孝感',
      '张家界',
      '莆田',
      '大连',
      '汕头',
      '温州',
      '秦皇岛',
      '青岛港',
      '锦州',
      '灌南',
      '吉安',
      '南京港',
      '茂名',
      '遵义',
      '宿迁',
      '衡阳',
      '长沙',
      '奉节',
      '黄骅',
      '淮北',
      '衢州',
      '黄冈',
      '漯河',
      '湘潭',
      '濮阳',
      '上饶',
      '泰安',
      '益阳',
      '中国广州',
      '鄂州',
      '东莞',
      '巫山',
      '云阳',
      '菏泽',
      '新余',
      '怀化',
      '江门',
      '深圳港',
      '营口',
      '惠州',
      '商丘',
      '抚州',
      '南昌',
      '郴州',
      '贵港',
      '江津',
      '娄底',
      '潜江',
      '武汉港',
      '北海',
      '天津港',
      '海口港',
      '梧州',
      '钦州',
      '赣州',
      '湛江',
      '太仓',
      '黄石',
      '中山',
      '乐山',
      '宜宾',
      '曹妃甸',
      '金华',
      '襄阳',
      '巢湖',
      '吉林',
      '石岛',
      '昭通',
      '莱州',
      '铜仁',
      '肇庆',
      '藤县',
      '宁波舟山港',
      '牡丹江',
      '洪湖',
      '哈尔滨',
      '黑河',
      '横县',
      '清远',
      '平果',
      '广安',
      '桂林',
      '石柱',
      '滨州',
      '荆门',
      '隆安',
      '韶关',
      '来宾',
      '漳州',
      '临夏',
      '仙桃',
      '黄山',
      '柳州',
      '八所',
      '济南',
      '呼伦贝尔',
      '崇左',
      '随州',
      '平乐',
      '阳江',
      '齐齐哈尔',
      '云浮',
      '桂平',
      '阳朔',
      '三亚',
      '巴东',
      '湘西',
      '东营',
      '灌云',
      '永川',
      '姜堰',
      '伊春',
      '南充',
      '大庆',
      '昆明',
      '清澜',
      '龙口',
      '台州港',
      '景德镇',
      '丽水',
      '苍梧',
      '佳木斯',
      '潮州',
      '封开',
      '合川',
      '天门',
      '保定',
      '揭阳',
      '泗洪',
      '永州',
      '昭平',
      '平南',
      '咸宁',
      '梅州',
      '巴南',
      '鸡喇',
      '松原',
      '武宣',
      '河池',
      '内江',
      '黄埔',
      '田东',
      '天峨',
      '象州',
      '汕尾',
      '鸡西',
      '达州',
      '贵阳',
      '临沧',
      '岚山',
      '思茅',
      '广州港',
      '贺州',
      '大化',
      '四会',
      '哈尔滨港',
      '蓬莱',
      '荷泽',
      'PANAMA',
      '建湖',
      '青海',
      '柳城',
      '羊口',
      '三沙',
      '长岛',
      '三水',
      '百色',
      '邵阳',
      '彭水',
      '巴拿马'
    ]
  },
  map: {
    searchArea: {
      shipNameCn: '船名（中）',
      shipNameEn: '船名（英）',
      mmsi: 'MMSI'
    },
    legends: {
      SHIP_NORMAL: { title: '正常船舶', color: '#13c2c2' },
      SHIP_WARNING: { title: '报警船舶', color: '#FA541C' },
      SHIP_BLACKLIST: { title: '黑名单船舶', color: '#151A30' }
    }
  },
  duty: {
    type: ['国际航行船舶船码不符', '首次进入', '船舶经过']
  },
  warn: {
    type: {
      FLOAT_SHIP: '浮吊船',
      FISHING_SHIP: '渔船',
      OVERLOAD_SAND_SHIP: '3000吨以上重载装砂内河船',
      OVERLOAD_SHIP: '超载船',
      SHIP_NAME_INVALID: '喷涂船名不规范船',
      HANG_FLAG_INVALID: '未按规定悬挂国旗船',
      BLACKLIST: '黑名单船舶',
      KEY_TRACK: '重点跟踪船舶',
      NAME_RCG_FAIL: '船名不规范(常规)',
      AIS_OFF: 'AIS未开',
      FOREIGN_AIS_CLOSED: '国际船舶AIS未开',
      FOREIGN_RCG_NAME_NOT_MATCH: '国际船舶船名不符',
      GHOST_SHIP: '幽灵船',
      VEST_SHIP: '马甲船'
    }
  },
  ship: {
    type: ['集装箱船', '干散货船', '危化品船', '公务船', '工程船', '浮吊船', '普货船', '渔船', '采砂船'],
    course: ['上行', '下行'],
    routeType: ['外国籍船舶', '中国籍远洋船', '港澳台船舶', '内贸船', '未知'],
    lockType: [
      { value: 'ESTUARY', label: '河口' },
      { value: 'BRIDGE', label: '桥梁' },
      { value: 'CHANNEL', label: '航道' }
    ],
    buildingColor: [
      {
        fill: 'rgb(238, 33, 44)',
        value: 'RED',
        label: '红色'
      },
      {
        fill: 'rgb(249, 79, 26)',
        value: 'ORANGE',
        label: '橙色'
      },
      {
        fill: 'rgb(243, 168, 20)',
        value: 'YELLOW',
        label: '黄色'
      },
      {
        fill: 'rgb(80, 192, 28)',
        value: 'GREEN',
        label: '绿色'
      },
      {
        fill: 'rgb(18, 190, 188)',
        value: 'CYAN',
        label: '青色'
      },
      {
        fill: 'rgb(24, 135, 239)',
        value: 'BLUE',
        label: '蓝色'
      },
      {
        fill: 'rgb(114, 46, 194)',
        value: 'PURPLE',
        label: '紫色'
      },
      {
        fill: 'rgb(123, 123, 123)',
        value: 'GRAY',
        label: '灰色'
      },
      {
        fill: 'rgb(255, 97, 176)',
        value: 'PINK',
        label: '粉色'
      },
      {
        fill: 'rgb(0, 0, 0)',
        value: 'BLACK',
        label: '黑色'
      },
      {
        fill: 'rgb(255, 255, 255)',
        value: 'WHITE',
        label: '白色'
      },
      {
        fill: 'rgb(161, 81, 27)',
        value: 'BROWN',
        label: '褐色'
      }
    ]
  }
}
export function getOptions (path, isArray) {
  const theEnum = get(enums, path)
  if (!theEnum) {
    console.error('获取配置选项失败:' + path)
    return []
  }
  if (isArray) {
    return theEnum
  } else if (typeof theEnum === 'object' && !Array.isArray(theEnum)) {
    const res = []
    Object.keys(theEnum).forEach((key) => {
      res.push({ label: theEnum[key], value: key })
    })
    return res
  } else if (Array.isArray(theEnum)) {
    return cloneDeep(theEnum).map((_) => {
      return _.label !== undefined && _.value !== undefined
        ? _
        : {
            label: _,
            value: _
          }
    })
  }
  return []
}
export function getEnumName (path, value) {
  const theEnum = get(enums, path)
  if (!theEnum) {
    return ''
  } else if (Array.isArray(theEnum)) {
    return theEnum.find((_) => _.value === value).label || ''
  } else {
    return theEnum[value]
  }
}
