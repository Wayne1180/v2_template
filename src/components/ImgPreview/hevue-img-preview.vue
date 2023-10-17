<!--
eslint-disable
 *                                                     __----~~~~~~~~~~~------___
 *                                    .  .   ~~//====......          __--~ ~~
 *                    -.            \_|//     |||\\  ~~~~~~::::... /~
 *                 ___-==_       _-~o~  \/    |||  \\            _/~~-
 *         __---~~~.==~||\=_    -_--~/_-~|-   |\\   \\        _/~
 *     _-~~     .=~    |  \\-_    '-~7  /-   /  ||    \      /
 *   .~       .~       |   \\ -_    /  /-   /   ||      \   /
 *  /  ____  /         |     \\ ~-_/  /|- _/   .||       \ /
 *  |~~    ~~|--~~~~--_ \     ~==-/   | \~--===~~        .\
 *           '         ~-|      /|    |-~\~~       __--~~
 *                       |-~~-_/ |    |   ~\_   _-~            /\
 *                            /  \     \__   \/~                \__
 *                        _--~ _/ | .-~~____--~-/                  ~~==.
 *                       ((->/~   '.|||' -_|    ~~-/ ,              . _||
 *                                  -_     ~\      ~~---l__i__i__i--~~_/
 *                                  _-~-__   ~)  \--______________--~~
 *                                //.-~~~-~_--~- |-------~~~~~~~~
 *                                       //.-~~~--\
 *                       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *
 *                               神兽保佑            永无BUG
 -->

<!--
 * @Author: your name
 * @Date: 2021-03-08 21:11:32
 * @LastEditTime: 2021-03-08 22:37:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /hevue-img-preview/src/lib/hevue-img-preview.vue
-->

<template>
  <transition name="fadeMy">
    <div
      class="hevue-wrap"
      id="hevue-wrap"
      v-if="show"
      ref="heImg"
      @mouseup="removeMove('pc')"
      @touchend="removeMove('mobile')"
      @click.self="clickMask"
      :style="'background:' + mainBackground"
    >
      <!-- 用于临时在手机端展示一些调试信息 -->
      <!-- <div>{{ logText }}</div> -->
      <div class="he-img-wrap">
        <img :src="images.loading" v-show="imgState === 1" />
        <!-- <div class="iconfont loading">&#xe6b1;</div> -->
        <img
          :src="imgurl"
          ref="heImView"
          @click.stop=""
          v-show="imgState === 2"
          class="he-img-view"
          :style="
            'transform: scale(' +
              imgScale +
              ') rotate(' +
              imgRotate +
              'deg);margin-top:' +
              imgTop +
              'px;margin-left:' +
              imgLeft +
              'px;' +
              maxWH
          "
          @mousedown="addMove"
          @touchstart="addMoveMobile"
        />
        <div class="iconfont hevue-img-error" v-show="imgState === 3">
          &#xec0d;
        </div>
        <div class="he-close-icon" @click.stop="close" :style="'color:' + closeColor">
          <img :src="require('./close.png')" />
        </div>
        <!-- 左箭头 -->
        <div
          class="arrow arrow-left iconfont"
          @click.stop="toogleImg(false)"
          v-if="multiple"
          :style="'color:' + controlColor + ';background: ' + controlBackground"
        >
          &#xe620;
        </div>
        <!-- 右箭头 -->
        <div
          class="arrow arrow-right iconfont"
          @click.stop="toogleImg(true)"
          v-if="multiple"
          :style="'color:' + controlColor + ';background: ' + controlBackground"
        >
          &#xe60d;
        </div>
        <div class="he-control-bar-wrap" :style="{ bottom: multiple ? '180px' : '20px' }">
          <div
            class="he-control-bar"
            @click.stop
            :style="'color:' + controlColor + ';background: ' + controlBackground"
          >
            <!-- 缩小 -->
            <div class="he-control-btn iconfont" @click.stop="scaleFunc(-0.15)">
              &#xe65e;
            </div>
            <!-- 放大 -->
            <div class="he-control-btn iconfont" @click.stop="scaleFunc(0.15)">
              &#xe65d;
            </div>
            <!-- 复位 -->
            <div class="he-control-btn iconfont" v-show="isFull" @click.stop="imgToggle">
              &#xe698;
            </div>
            <!-- 复位 -->
            <div class="he-control-btn iconfont" v-show="!isFull" @click.stop="imgToggle">
              &#xe86b;
            </div>
            <!-- 左转 -->
            <div class="he-control-btn iconfont" @click.stop="rotateFunc(-90)">
              &#xe670;
            </div>
            <!-- 右转 -->
            <div class="he-control-btn iconfont" @click.stop="rotateFunc(90)">
              &#xe66f;
            </div>
            <!-- 下载 -->
            <div class="he-control-btn iconfont" @click.stop="downloadImage">
              &#xe694;
            </div>
          </div>
        </div>

        <!-- <div
          class="he-control-num"
          v-if="multiple"
          :style="'color:' + controlColor + ';background: ' + controlBackground">
          {{ imgIndex + 1 }} / {{ imgList.length }}
        </div> -->
        <div class="all-wrap" v-if="multiple">
          <div class="left flex-center" @click.stop="toogleImg(false)">
            <a-icon type="left" />
          </div>
          <div class="right flex-center" @click.stop="toogleImg(true)">
            <a-icon type="right" />
          </div>
          <div class="all flex-row align-center">
            <img
              :id="'img' + index"
              v-for="(item, index) in imgList"
              :key="index"
              v-lazy="listThumb ? $tn(item) : item"
              data-bg="rgba(45, 52, 54, .9)"
              @click="toogleImg(true, index)"
              :class="{ first: index === 0, hl: index === imgIndex }"
            />
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import download from '@/utils/download'
import images from '@/data/images'
export default {
  name: 'HevueImgPreview',
  props: {
    listThumb: {
      type: Boolean,
      default: false
    },
    show: {
      type: Boolean,
      default: false
    },
    clickMaskCLose: String,
    url: String,
    mainBackground: String, // 整体背景颜色
    controlColor: String, // 控制条字体颜色
    controlBackground: String, // 控制条背景颜色
    closeColor: String, // 关闭图标的颜色
    instance: Object,
    multiple: {
      type: Boolean,
      default: false
    },
    keyboard: {
      type: String,
      default: 'open'
    },
    nowImgIndex: {
      type: Number,
      default: 0
    },
    imgList: Array
  },
  data () {
    return {
      images,
      // imgWidth: 0,
      // imgHeight: 0,
      imgScale: 1,
      imgTop: 0,
      imgLeft: 0,
      imgRotate: 0,
      isFull: false,
      maxWH: 'max-width:100%;max-height:100%;',
      clientX: 0,
      clientY: 0,
      imgIndex: 0,
      canRun: true,
      imgurl: '',
      imgState: 1,
      logText: '',
      start: [
        {
          clientX: 217,
          clientY: 279,
          force: 1,
          identifier: 0,
          pageX: 217,
          pageY: 279,
          radiusX: 11.5,
          radiusY: 11.5,
          rotationAngle: 0,
          screenX: 493,
          screenY: 456
        },
        {
          clientX: 247,
          clientY: 273,
          force: 1,
          identifier: 0,
          pageX: 247,
          pageY: 273,
          radiusX: 11.5,
          radiusY: 11.5,
          rotationAngle: 0,
          screenX: 523,
          screenY: 450
        }
      ],
      mobileScale: 0 // 手指离开时图片的缩放比例
    }
  },
  mounted () {
    this.initImg()
  },
  watch: {
    url () {
      this.initImg()
    },
    show (newV) {
      if (newV) {
        this.$nextTick(_ => {
          const _dom = document.getElementById('hevue-wrap')
          _dom.onmousewheel = this.scrollFunc
          // 火狐浏览器没有onmousewheel事件，用DOMMouseScroll代替(滚轮事件)
          document.body.addEventListener('DOMMouseScroll', this.scrollFunc)
          // 禁止火狐浏览器下拖拽图片的默认事件
          document.ondragstart = function () {
            return false
          }
          // 判断是否多图
          if (this.multiple) {
            if (Array.isArray(this.imgList) && this.imgList.length > 0) {
              this.imgIndex = Number(this.nowImgIndex) || 0
              // this.url = this.imgList[this.imgIndex]
              this.changeUrl(this.imgList[this.imgIndex], this.imgIndex)
            } else {
              console.error('imgList 为空或格式不正确')
            }
          } else {
            this.changeUrl(this.url)
            // var ImgObj = new Image()
            // ImgObj.src = this.url
            // if (ImgObj.fileSize > 0 || (ImgObj.width > 0 && ImgObj.height > 0)) {
            //   return true
            // } else {
            //   console.error('传入图片地址不正确--组件hevue-img-preview')
            // }
          }
          // 判断是否开启键盘事件
          if (this.keyboard === 'open') {
            document.addEventListener('keydown', this.keyHandleDebounce)
          }
        })
      }
    }
  },
  methods: {
    close () {
      // this.$closehevueImgPreview()
      // eslint-disable-next-line vue/no-mutating-props
      this.instance.show = false
      this.initImg()
      this.maxWH = 'max-width:100%;max-height:100%;'
      this.isFull = false
      // 移除火狐浏览器下的鼠标滚动事件
      document.body.removeEventListener('DOMMouseScroll', this.scrollFunc)
      // 恢复火狐及Safari浏览器下的图片拖拽
      document.ondragstart = null
      // 移除键盘事件
      if (this.keyboard) {
        document.removeEventListener('keydown', this.keyHandleDebounce)
      }
    },
    initImg () {
      this.mobileScale = 1
      this.imgScale = 1
      this.imgRotate = 0
      this.imgTop = 0
      this.imgLeft = 0
    },
    /**
     * 切换图片
     * true 下一张
     * false 上一张
     */
    toogleImg (bool, index = -1) {
      let ref = document.getElementById('img' + index)
      if (index !== -1) {
        this.imgIndex = index
        if (this.imgIndex > this.imgList.length - 1) {
          this.imgIndex = 0
        }
        if (this.imgIndex < 0) {
          this.imgIndex = this.imgList.length - 1
        }
        this.changeUrl(this.imgList[this.imgIndex], this.imgIndex)
        this.$nextTick(() => {
          ref && ref.scrollIntoView({ behavior: 'smooth' })
        })
        return
      }
      if (bool) {
        this.imgIndex++
        if (this.imgIndex > this.imgList.length - 1) {
          this.imgIndex = 0
        }
      } else {
        this.imgIndex--
        if (this.imgIndex < 0) {
          this.imgIndex = this.imgList.length - 1
        }
      }
      // this.url = this.imgList[this.imgIndex]
      this.$nextTick(() => {
        ref = document.getElementById('img' + this.imgIndex)
        //
        ref && ref.scrollIntoView({ behavior: 'smooth' })
      })

      this.changeUrl(this.imgList[this.imgIndex], this.imgIndex)
    },
    // 改变图片地址
    /**
     * @description:
     * @param {String} url 要显示的图片的url
     * @param {Number} index 当前显示当图片下标，防止用户点击切换图片过快
     * @return {*}
     */
    changeUrl (url, index) {
      this.imgState = 1
      const img = new Image()
      img.src = url
      img.onload = () => {
        // 如果加载出来图片当下标不是当前显示图片当下标，则不予显示（用户点击过快当时候，会出现用户点到第三张了，此时第一张图片才加载完当情况）
        // eslint-disable-next-line eqeqeq
        if (index != undefined && index == this.imgIndex) {
          this.imgState = 2
          this.imgurl = url
          // eslint-disable-next-line eqeqeq
        } else if (index == undefined) {
          this.imgState = 2
          this.imgurl = url
        }
      }
      img.onerror = () => {
        // eslint-disable-next-line eqeqeq
        if (index != undefined && index == this.imgIndex) {
          this.imgState = 3
          // eslint-disable-next-line eqeqeq
        } else if (index == undefined) {
          this.imgState = 3
        }
      }
    },
    // 旋转图片
    rotateFunc (deg) {
      this.imgRotate += deg
    },
    // 图片缩放
    scaleFunc (num, bool) {
      if (this.imgScale <= 0.2 && num < 0) return
      if (bool) {
        this.imgScale = num
      } else {
        this.imgScale += num
      }
    },
    // 图片原尺寸切换
    imgToggle () {
      this.initImg()
      if (this.isFull) {
        this.maxWH = 'max-width:100%;max-height:100%;'
      } else {
        this.maxWH = ''
      }
      this.isFull = !this.isFull
    },
    // 鼠标滚轮缩放
    scrollFunc (e) {
      e = e || window.event
      // e.returnValue = false // ie
      // 火狐下没有wheelDelta，用detail代替，由于detail值的正负和wheelDelta相反，所以取反
      e.delta = e.wheelDelta || -e.detail

      e.preventDefault()
      if (e.delta > 0) {
        // 当滑轮向上滚动时
        this.scaleFunc(0.05)
      }
      if (e.delta < 0) {
        // 当滑轮向下滚动时
        this.scaleFunc(-0.05)
      }
    },
    // 鼠标按下
    addMove (e) {
      e = e || window.event
      this.clientX = e.clientX
      this.clientY = e.clientY
      this.$refs.heImg.onmousemove = this.moveFunc
    },
    // 手指按下事件
    addMoveMobile (e) {
      e.preventDefault()
      e = e || window.event
      if (e.touches.length > 1) {
        this.start = e.touches
      } else {
        this.clientX = e.touches[0].pageX
        this.clientY = e.touches[0].pageY
      }
      // 添加手指拖动事件
      this.$refs.heImg.ontouchmove = this.moveFuncMobile
    },
    // 鼠标拖动
    moveFunc (e) {
      e = e || window.event
      e.preventDefault()
      const movementX = e.clientX - this.clientX
      const movementY = e.clientY - this.clientY
      // event.clientY;
      this.imgLeft += movementX * 2
      this.imgTop += movementY * 2
      this.clientX = e.clientX
      this.clientY = e.clientY
    },
    // 手指拖动
    moveFuncMobile (e) {
      e = e || window.event
      // ;
      if (e.touches.length > 1) {
        var now = e.touches
        var scale = this.getDistance(now[0], now[1]) / this.getDistance(this.start[0], this.start[1])
        // this.mobileScale = scale;
        this.logText = `${scale},${this.mobileScale}`
        // 判断是否手指缩放过，如果缩放过，要在上次缩放的比例基础上进行缩放
        if (this.mobileScale) {
          if (scale > 1) {
            // 放大
            this.scaleFunc(scale + this.mobileScale - 1, true)
          } else {
            // 缩小
            this.scaleFunc(scale * this.mobileScale, true)
          }
        } else {
          this.scaleFunc(scale, true)
        }
      } else {
        const touch = e.touches[0]
        e.preventDefault()
        const movementX = touch.pageX - this.clientX
        const movementY = touch.pageY - this.clientY
        // event.clientY;
        this.imgLeft += movementX * 2
        this.imgTop += movementY * 2
        this.clientX = touch.pageX
        this.clientY = touch.pageY
      }
    },
    // 移除拖动事件
    removeMove (type) {
      if (type === 'pc') {
        this.$refs.heImg.onmousemove = null
      } else {
        this.mobileScale = this.imgScale
        this.$refs.heImg.ontouchmove = null
      }
    },
    keyHandleDebounce (e) {
      if (this.canRun) {
        // 如果this.canRun为true证明当前可以执行函数
        this.keyHandle(e)
        this.canRun = false // 执行函数后一段时间内不可再次执行
        setTimeout(() => {
          this.canRun = true // 等到了我们设定的时间之后，把this.canRun改为true，可以再次执行函数
        }, 300)
      }
    },
    // 键盘事件
    keyHandle (e) {
      e.stopPropagation()
      // eslint-disable-next-line no-redeclare
      var e = window.event || e
      var key = e.keyCode || e.which || e.charCode
      switch (key) {
        case 27: // esc
          this.close()
          break
        case 65:
        case 37: // a键-上一张
          if (this.multiple) {
            this.toogleImg(false)
          }
          break
        case 68:
        case 39: // d键-下一张
          if (this.multiple) {
            this.toogleImg(true)
          }
          break
        case 87: // w键-放大
          this.scaleFunc(0.15)
          break
        case 83: // s键-缩小
          this.scaleFunc(-0.15)
          break
        case 81: // q键-逆时针旋转
          this.rotateFunc(-90)
          break
        case 69: // e键-顺时针旋转
          this.rotateFunc(90)
          break
        case 82: // r键-复位键
          this.initImg()
          break

        default:
          break
      }
    },
    // 点击遮罩层
    clickMask () {
      // ;
      if (this.clickMaskCLose === 'open') {
        this.close()
      }
    },
    // 缩放 勾股定理方法-求两点之间的距离
    getDistance (p1, p2) {
      var x = p2.pageX - p1.pageX
      var y = p2.pageY - p1.pageY
      return Math.sqrt(x * x + y * y)
    },
    /**
     * @description:
     * @param {String} imgsrc
     * @param {*} name
     * @return {*}
     */
    downloadImage () {
      const URL = this.multiple ? this.imgList[this.imgIndex] : this.url
      let name = URL.split('/').pop().split('?')[0]
      try {
        name = decodeURI(name)
      } catch (e) {
        console.error(e)
      }
      const res = download(encodeURI(URL), name)
      ;(res && this.$message.success('下载成功')) || this.$message.error('下载失败')
    }
  }
}
</script>

<style scoped lang="scss">
@import './iconfont/iconfont.css';

/* @import '//at.alicdn.com/t/font_1776686_mw0jz39v97.css'; */
.hevue-wrap {
  position: fixed;
  z-index: 999999;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
}

.he-img-wrap {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  width: 100%;
  height: 100%;

  text-align: center;
  vertical-align: middle;

  color: #fff;
}

.he-img-view {
  /* transition: transform 0.3s; */
}

.he-close-icon {
  font-size: 46px;

  position: absolute;
  top: 50px;
  right: 50px;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  transition: all .2s;

  color: #666;

  img {
    width: 51px;
    height: 51px;
  }
}

.arrow {
  font-size: 3vw;
  line-height: 50px;

  position: absolute;
  top: 50%;

  width: 50px;
  height: 50px;

  cursor: pointer;
  transition: all .2s;
  -ms-transform: translateY(-50%);
      transform: translateY(-50%);
  text-align: center;

  opacity: .6;
  border-radius: 50%;
}

.arrow:hover {
  font-size: 32px;

  opacity: .8;
}

.arrow-left {
  left: 50px;
}

.arrow-right {
  right: 50px;
}

.he-close-icon:hover {
  transform: rotate(90deg);
}

.he-control-bar-wrap {
  position: absolute;
  bottom: 180px;
  left: 0;

  display: flex;

  width: 100%;
}

.he-control-bar {
  bottom: 180px;
  /* position: absolute; */
  /* left: 50%; */
  /* display: flex;
  justify-content: space-between; */

  display: flex;

  height: 44px;
  margin: 0 auto;
  padding: 0 22px;

  border-radius: 22px;

  /* display: flex;
  justify-content: space-between; */
}

.he-control-num {
  font-size: 16px;

  position: absolute;
  bottom: 20px;
  left: 50%;

  padding: 0 22px;

  -ms-transform: translateX(-50%);
      transform: translateX(-50%);

  border-radius: 15px;
}

.he-control-btn {
  font-size: 24px;
  line-height: 44px;

  padding: 0 9px;

  cursor: pointer;
  /* display: inline-block; */
  transition: all .2s;
}

.he-control-btn:hover {
  transform: scale(1.2);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .3s;
}

.fade-enter,
.fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.hevue-img-error {
  font-size: 56px;

  color: #ccc;
}

.all {
  overflow: scroll;

  max-width: 80vw;

  &::-webkit-scrollbar {
    width: 0 !important;
  }

  img {
    flex-shrink: 0;

    width: 180px;
    height: 120px;
    margin-left: 17px;

    object-fit: cover;

    &.first {
      margin-left: 0;
    }

    &.hl {
      box-sizing: border-box;

      border: 3px solid #fff;
    }
  }

  &-wrap {
    position: absolute;
    bottom: 20px;

    .left,
    .right {
      font-size: 20px;

      position: absolute;
      top: calc(50% - 29.5px - 5px);

      width: 26px;
      height: 59px;

      color: #313132;
      background: #666;
    }

    .left {
      left: -40px;
    }

    .right {
      right: -40px;
    }
  }
}

</style>
