<!--
 * @Author: 王欣磊
 * @Date: 2021-01-21 15:21:23
 * @LastEditors: 王欣磊
 * @LastEditTime: 2021-04-21 17:30:50
 * @Description: 拖动组件(插槽)
 * @FilePath: /ship-face/src/components/Drag/drag.vue
-->
<template>
  <div
    class="drag-it-dude"
    @touchstart.stop="hang"
    @touchend.stop="drop"
    @mousedown.stop="hang"
    @mouseup.stop="drop"
    @touchmove.stop="iosMove"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'DragItDude',
  props: {
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    },
    parentWidth: {
      type: Number,
      default: 0
    },
    parentHeight: {
      type: Number,
      default: 0
    }
  },
  watch: {
    width (newWidth, oldWidth) {
      if (newWidth < oldWidth) return
      if (this.left === 0) return

      this.parent.width = this.parentWidth || this.elem.parentNode.offsetWidth
      this.parent.height = this.parentHeight || this.elem.parentNode.offsetHeight

      if (newWidth > this.parent.width - this.left) {
        const newLeft = this.parent.width - newWidth
        this.left = newLeft < 0 ? 0 : newLeft
        this.elem.style.left = `${this.left}px`
      }
    },
    height (newHeight, oldHeight) {
      if (newHeight < oldHeight) return
      if (this.top === 0) return

      this.parent.width = this.parentWidth || this.elem.parentNode.offsetWidth
      this.parent.height = this.parentHeight || this.elem.parentNode.offsetHeight

      if (newHeight > this.parent.height - this.top) {
        const newTop = this.parent.height - this.height
        this.top = newTop
        this.elem.style.top = `${this.top}px`
      }
    }
  },
  data: () => ({
    shiftY: null,
    shiftX: null,
    left: 0,
    top: 0,
    elem: null,
    isIos: false,
    parent: {
      width: 0,
      height: 0
    }
  }),
  methods: {
    iosMove (e) {
      if (this.isIos) this.elementMove(e)
    },
    elementMove (e) {
      this.$emit('dragging')
      e.preventDefault()
      if (!e.pageX) {
        document.body.style.overflow = 'hidden'
      }
      const x = e.pageX || e.changedTouches[0].pageX
      const y = e.pageY || e.changedTouches[0].pageY
      let newLeft = x - this.shiftX
      let newTop = y - this.shiftY
      const newRight = x - this.shiftX + this.elem.offsetWidth
      const newBottom = y - this.shiftY + this.elem.offsetHeight
      if (newLeft < 0) {
        newLeft = 0
      } else if (newRight > this.parent.width) {
        newLeft = this.parent.width - this.elem.offsetWidth
      } else {
        newLeft = x - this.shiftX
      }
      if (newTop < 0) {
        newTop = 0
      } else if (newBottom > this.parent.height) {
        newTop = this.parent.height - this.elem.offsetHeight
      } else {
        newTop = y - this.shiftY
      }
      this.elem.style.left = `${newLeft}px`
      this.left = newLeft
      this.elem.style.top = `${newTop}px`
      this.top = newTop
    },
    hang (e) {
      this.$emit('activated')
      this.parent.width = this.parentWidth || this.elem.parentNode.offsetWidth
      this.parent.height = this.parentHeight || this.elem.parentNode.offsetHeight
      this.shiftX = e.pageX ? e.pageX - this.elem.offsetLeft : e.changedTouches[0].pageX - this.elem.offsetLeft
      this.shiftY = e.pageY ? e.pageY - this.elem.offsetTop : e.changedTouches[0].pageY - this.elem.offsetTop
      if (e.pageX) {
        if (this.isIos) {
          document.addEventListener('touchmove', this.elementMove)
        } else {
          document.addEventListener('mousemove', this.elementMove)
          document.addEventListener('mouseleave', this.drop)
        }
      } else {
        document.addEventListener('touchmove', this.elementMove)
      }
    },
    drop () {
      this.$emit('dropped')
      document.body.style.overflow = null
      document.removeEventListener('mousemove', this.elementMove, false)
      document.removeEventListener('touchmove', this.elementMove, false)
      document.onmouseup = null
      document.ontouchend = null
    }
  },
  mounted () {
    this.isIos = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
    this.elem = this.$el
  }
}
</script>

<style>
.drag-it-dude {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
}
</style>
