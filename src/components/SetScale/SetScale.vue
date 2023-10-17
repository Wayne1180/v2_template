<!--
 * @Author: 王欣磊
 * @Date: 2021-06-03 17:46:12
 * @LastEditors: 王欣磊
 * @LastEditTime: 2021-06-03 18:27:03
 * @Description:
 * @FilePath: /ship-face/src/components/SetScale/SetScale.vue
-->
<template>
  <div class="showBox" ref="showBox" :style="{width:width+'px',height:height+'px'}">
    <div class="contBox" ref="contentBox" :style="{transform:transform}">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ['scale', 'r'], // 接收一个参数为缩放倍数
  data () {
    return {
      width: 1,
      height: 1,
      transform: 'scale(1)'
    }
  },
  methods: {
    fun () {
      console.log(this.r)
      if (!this.r) {
        return
      }
      console.log(this.r.getBoundingClientRect())
      const boundClient = this.r.getBoundingClientRect()
      this.transform = `scale(${this.scale})`
      this.width = boundClient.width * this.scale
      this.height = boundClient.height * this.scale
    }
  },
  mounted () {
    this.fun()
  },
  watch: {
    scale () {
      this.fun()
    },
    r () {
      this.fun()
    }
  }
}
</script>

<style scoped="scoped">
.contBox {
  transform-origin: left top;
}
</style>
