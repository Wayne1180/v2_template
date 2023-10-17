/*
 * @Author: 王欣磊
 * @Date: 2022-05-30 15:34:53
 * @LastEditors: 王欣磊
 * @LastEditTime: 2022-06-22 11:16:09
 * @Description:
 * @FilePath: /bianjian-ship/src/utils/mapFunction.js
 */
import gcoord from 'gcoord'
import Overlay from 'ol/Overlay'
import LineString from 'ol/geom/LineString'
import { map as mapImages } from '@/data/images'
import cloneDeep from 'lodash/cloneDeep'
import filter from 'lodash/filter'
// import Cluster from 'ol/source/Cluster'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import VectorSource from 'ol/source/Vector'
import VectorLayer from 'ol/layer/Vector'
import CircleStyle from 'ol/style/Circle'
// import TextStyle from 'ol/style/Text'
import Style from 'ol/style/Style'
import Stroke from 'ol/style/Stroke'
import Fill from 'ol/style/Fill'
import Icon from 'ol/style/Icon'
import { getStrFullLength } from '@/components/_util/util'
import { getDistance } from 'ol/sphere'
import { getEnumName } from '@/config/enum.config.js'

// const clusterDistance = 20
export function getMapDistance () {
  const bound = this.map.getView().calculateExtent(this.map.getSize())
  const dot1 = gcoord.transform([bound[0], bound[1]], gcoord.EPSG3857, gcoord.WGS84)
  const dot2 = gcoord.transform([bound[2], bound[3]], gcoord.EPSG3857, gcoord.WGS84)
  console.log('🚀 ~ file: mapFunction.js ~ line 36 ~ getMapDistance ~ getDistance(dot1, dot2) / 1000', getDistance(dot1, dot2) / 1000)
  return getDistance(dot1, dot2) / 1000
}
export function convertCoord (coord, reverse = false) {
  let res = null
  if (reverse) {
    const aMapCord = gcoord.transform(coord, gcoord.EPSG3857, gcoord.AMap)
    res = gcoord.transform(aMapCord, gcoord.AMap, gcoord.WGS84)
  } else {
    const aMapCord = gcoord.transform(coord, gcoord.WGS84, gcoord.AMap)
    res = gcoord.transform(aMapCord, gcoord.AMap, gcoord.EPSG3857)
  }
  return res
}
var getPixelRatio = function (context) {
  var backingStore =
    context.backingStorePixelRatio ||
    context.webkitBackingStorePixelRatio ||
    context.mozBackingStorePixelRatio ||
    context.msBackingStorePixelRatio ||
    context.oBackingStorePixelRatio ||
    context.backingStorePixelRatio ||
    1
  return (window.devicePixelRatio || 1) / backingStore
}
var getFeatures = function (...data) {
  return data
    .filter((i) => i.longitude && i.latitude && Math.abs(i.longitude) <= 180 && Math.abs(i.latitude))
    .map((item) => {
      const coordinates = convertCoord([item.longitude, item.latitude])
      //
      return new Feature({
        // EPSG:3857坐标系下地理坐标,后期可能对接时需要转换
        geometry: new Point(coordinates),
        // 携带的自定义参数
        data: {
          ...item,
          // 计算航行角度
          rotate: (item.courseOverGround && (item.courseOverGround * Math.PI) / 180) || 0,
          type:
            Array.isArray(item.shipWarnLabels) && item.shipWarnLabels.length > 0
              ? item.shipWarnLabels.includes('BLACKLIST')
                ? 'SHIP_BLACKLIST'
                : 'SHIP_WARNING'
              : 'SHIP_NORMAL',
          speed: item.speedOverGround || 0
        }
      })
    })
}

var getShipNameFeatures = function (...data) {
  const map = this.map
  return filter(
    data,
    (o) => Math.abs(o.longitude) <= 180 && Math.abs(o.latitude) <= 90 && (o.shipNameCn || o.shipNameEn || o.mmsi)
  ).map((item) => {
    var pointFeature = new Feature({
      geometry: new Point(convertCoord([item.longitude, item.latitude])),
      data: item
    })
    pointFeature.setStyle((feature, resolution) => {
      const name = String(item.shipNameCn || item.shipNameEn || item.mmsi)
      const zoom = map.getView().getZoom()
      // console.log('🚀 ~ file: mapFunctions.js ~ line 337 ~ name', name)
      if (zoom < 15) {
        return null
      } else {
        //  const _offset = offset(20, (item.courseOverGround && (item.courseOverGround * Math.PI) / 180) || 0)
        var canvas = document.createElement('canvas')
        var ctx = canvas.getContext('2d')
        var ratio = getPixelRatio(ctx)
        const cw = getStrFullLength(name) * 9
        const ch = 20
        canvas.width = (cw + 15) * ratio
        canvas.height = (ch + 15) * ratio
        ctx.fillStyle = 'rgba(255,255,255,0.5)'
        ctx.strokeStyle = 'rgba(255,255,255,0.5)'
        ctx.fillRect(0, 0, cw * ratio, ch * ratio)
        ctx.textAlign = 'center'
        ctx.fillStyle = '#000'
        ctx.font = `${11 * ratio}px "Source Han Sans CN"`
        ctx.fillText(name, (cw * ratio) / 2, (ch * ratio) / 2 + 4 * ratio)

        ctx.beginPath()
        ctx.moveTo(cw * ratio, ch * ratio)
        ctx.lineTo(canvas.width, canvas.height)
        ctx.closePath()

        ctx.lineWidth = 2
        ctx.strokeStyle = 'black'
        ctx.stroke()
        return [
          new Style({
            image: new Icon({
              img: canvas,
              scale: 1 / ratio,
              imgSize: [canvas.width, canvas.height],
              anchor: [1, 1]
            })
          })
        ]
      }
    })
    return pointFeature
  })
}

export function removeLayers (keys = []) {
  const map = this.map
  if (!map) {
    return
  }
  keys.map((item) => {
    this[item] && map.removeLayer(this[item])
  })
}
export function focus (item) {
  const map = this.map
  // console.log('🚀 ~ file: mapFunctions.js ~ line 66 ~ focus ~ item', item)
  !item.rotate && (item.rotate = (item.courseOverGround && (item.courseOverGround * Math.PI) / 180) || 0)
  // 框样式
  const imageStyle = new Style({
    image: new Icon({
      src: mapImages.border,
      scale: 0.4,
      rotation: item.rotate + Math.PI / 2
    })
  })
  // 数据源
  const vectorSource = new VectorSource()
  const vectorLayer = new VectorLayer({
    source: vectorSource,
    zIndex: 9999
  })
  // 用于充当标注的要素
  const labelFeature = new Feature({
    geometry: new Point(convertCoord([item.longitude, item.latitude]))
  })
  // 设置标注的样式
  labelFeature.setStyle(imageStyle)
  // 将标注要素添加到矢量图层中(feature -> source -> layer)
  vectorSource.addFeature(labelFeature)

  // 添加前清空
  this.focusLayer && map.removeLayer(this.focusLayer)
  map.addLayer(vectorLayer)
  this.focusLayer = vectorLayer
}
export function updateShipLayer (...data) {
  const nameLayer = this.nameLayer
  const shipLayer = this.shipLayer
  if (!nameLayer || !shipLayer) {
    addShips.apply(this, data)
    return
  }
  const dataForName = cloneDeep(data)
  const shipSource = new VectorSource({
    features: getFeatures.apply(this, data)
  })
  // const clusterSource = new Cluster({
  //   distance: clusterDistance,
  //   source: shipSource
  // })
  const nameSource = new VectorSource({
    features: getShipNameFeatures.apply(this, dataForName)
  })
  nameLayer && nameLayer.setSource(nameSource)
  shipLayer && shipLayer.setSource(shipSource)
}
export function addShips (...data) {
  const map = this.map
  const dataForName = cloneDeep(data)
  // 过滤不合法数据
  data = filter(data, (o) => Math.abs(o.longitude) <= 180 && Math.abs(o.latitude) <= 90)
  //   console.log('🚀 ~ file: mapFunction.js ~ line 56 ~ addShips ~ data', data)
  // 重组数据,生成数据feature实例集合
  const features = getFeatures.apply(this, data)
  // console.error(features)
  // 矢量源
  var source = new VectorSource({
    features: features
  })
  // const clusterSource = new Cluster({
  //   distance: clusterDistance,
  //   source: source
  // })
  // 聚合 点 源配置
  // var clusterSource = new Cluster({
  //   distance: 40, // 相距小于此像素聚合
  //   source: source // 数据源
  // })
  // 加载聚合标注的矢量图层
  var styleCache = {} // 样式缓存 - 看需求,暂时没用(性能待测)
  var style
  var shipLayer = new VectorLayer({
    source: source,
    // declutter: true,
    style: function (feature, resolution) {
      const zoom = map.getView().getZoom()
      // var size = feature.get('features').length
      // const factor = Math.pow(size / data.length, 1 / 18)
      // const Hue = 180 - factor * 180
      // const bgColor = 'hsla(' + Hue + ',100%,50%,0.7)'
      // const fontColor = 'hsla(' + Hue + ',100%,20%,1)'
      // const borderColor = 'hsla(' + Hue + ',100%,40%,1)'
      // 根据zoom显示点或者图标

      // if (size <= 1) {
      // feature = feature.get('features')[0]
      const type = feature.get('data')['type']
      if (zoom < 12) {
        style = [
          new Style({
            // 圆样式
            image: new CircleStyle({
              radius: 3,
              // 颜色边填充
              stroke: new Stroke({
                color: getEnumName('map.legends', type)?.color || '#75F94C'
              }),
              // 颜色填充
              fill: new Fill({
                color: getEnumName('map.legends', type)?.color || '#75F94C'
              })
            })
          })
        ]
      } else {
        style = styleCache[type + '-' + feature.get('data')['rotate']] || [
          new Style({
            // icon为自定图标
            image: new Icon({
              // 获取此点的自定义参数,反映在样式上
              src: mapImages[type] || mapImages.SHIP_NORMAL,
              // src: icons.homeMap.shipIcon[_.sample(['ASSISTANT', 'BLACKLIST', 'KEY_TRACK', 'FIRST_ENTRY', 'AIS_DISABLED', 'NAME_RCG_FALL', 'NORMAL'])],
              scale: 0.55,
              // 取之前算的航向角度
              rotation: feature.get('data')['rotate']
            })
          }),
          new Style({
            image: new Icon({
              src: mapImages.line,
              anchor: [0.5, 1],
              scale: [1, feature.get('data')['speed'] / 1022],
              rotation: feature.get('data')['rotate']
            })
          })
        ]
        styleCache[type + '-' + feature.get('data')['rotate']] = style
      }
      // } else {
      //   style = [
      //     new Style({
      //       image: new CircleStyle({
      //         radius: 18,
      //         stroke: new Stroke({
      //           color: borderColor
      //         }),
      //         fill: new Fill({
      //           color: bgColor
      //         })
      //       }),
      //       text: new TextStyle({
      //         text: size.toString(),
      //         font: 'bold 15px sans-serif',
      //         fill: new Fill({
      //           color: fontColor
      //         })
      //       })
      //     })
      //   ]
      // }

      return style
    },
    zIndex: 99
  })
  // 船名feature
  const shipNameFeatures = getShipNameFeatures.apply(this, dataForName)
  const nameLayer = new VectorLayer({
    source: new VectorSource({
      features: shipNameFeatures
    }),
    declutter: true
  })
  this.shipLayer && map.removeLayer(this.shipLayer)
  map.addLayer(shipLayer)
  this.shipLayer = shipLayer
  // 添加前删除
  this.nameLayer && map.removeLayer(this.nameLayer)
  map.addLayer(nameLayer)
  this.nameLayer = nameLayer
}

export function addSnapMarkers (data) {
  this.$ia(this.markers) &&
    this.markers.forEach((_) => {
      this.map.removeOverlay(_)
    })
  const markers = data
    .filter((i) => i.longitude && i.latitude && Math.abs(i.longitude) <= 180 && Math.abs(i.latitude) <= 90)
    .map((_) => {
      return new Overlay({
        position: convertCoord([_.longitude, _.latitude]),
        element: document.getElementById('snap-' + _.id),
        stopEvent: false,
        positioning: 'center-center',
        id: _.id
      })
    })
  markers.forEach((_) => {
    this.map.addOverlay(_)
  })
  this.markers = markers
}

export function addPath (...data) {
  const map = this.map
  /**
   *
   *
   * @param {*} feature
   * @returns style - 样式
   */
  var points = []
  points = filter(data, (o) => Boolean(o.longitude && o.latitude)).map((item) => {
    const geo = convertCoord([item.longitude, item.latitude])
    return { geo, item: { geo, ...item } }
  })

  const arrowStyles = function (feature, res) {
    const geometry = feature.getGeometry()
    const styles = [
      new Style({
        stroke: new Stroke({
          color: 'red',
          width: 6
        })
      })
    ]
    if (!(geometry instanceof LineString) || res > 10) return styles
    const length = geometry.getLength()
    const step = 60
    const geoStep = step * res
    const arrowNum = Math.floor(length / geoStep)
    const rotations = []
    const distances = [0]
    geometry.forEachSegment(function (start, end) {
      const dx = end[0] - start[0]
      const dy = end[1] - start[1]
      const rotation = Math.atan2(dy, dx)
      distances.unshift(Math.sqrt(dx ** 2 + dy ** 2) + distances[0])
      rotations.push(rotation)
    })
    for (let i = 1; i < arrowNum; ++i) {
      const arrowCoord = geometry.getCoordinateAt(i / arrowNum)
      const d = i * geoStep
      const grid = distances.findIndex((x) => x <= d)

      styles.push(
        new Style({
          geometry: new Point(arrowCoord),
          image: new Icon({
            src: mapImages.arrow,
            opacity: 1,
            anchor: [0.5, 0.5],
            rotateWithView: true,
            rotation: -rotations[distances.length - grid - 1] + Math.PI / 2,
            scale: 0.1
          })
        })
      )
    }
    return styles
  }
  // 关键点
  const snapPointFeatures = filter(data, (o) => Boolean(o.longitude && o.latitude && o.shipImgMetaId)).map((item) => {
    var pointFeature = new Feature({
      geometry: new Point(convertCoord([item.longitude, item.latitude])),
      data: item
    })
    pointFeature.setStyle((feature, resolution) => {
      const zoom = map.getView().getZoom()
      // console.log('🚀 ~ file: mapFunction.js ~ line 394 ~ pointFeature.setStyle ~ resolution', resolution)
      if (zoom < 12) {
        return null
      } else {
        return [
          new Style({
            image: new Icon({
              scale: 0.4,
              anchor: [0.5, 1.15],
              src: mapImages.camera
            })
          }),
          new Style({
            image: new CircleStyle({
              radius: 5,
              stroke: new Stroke({
                color: '#169ef5'
              }),
              fill: new Fill({
                color: '#169ef5'
              })
            })
          })
        ]
      }
    })
    return pointFeature
  })
  // 关键点结束
  var layerLines = new VectorLayer({
    source: new VectorSource({
      features: [
        new Feature({
          geometry: new LineString(
            points.map((item) => item.geo),
            'XY'
          ),
          name: 'Line'
        }),
        ...snapPointFeatures
        // ...timePointFeatures
      ]
    }),
    style: arrowStyles
  })
  layerLines.setZIndex(999999)
  this.layerLines && this.map.removeLayer(this.layerLines)
  this.map.addLayer(layerLines)
  this.layerLines = layerLines
}
