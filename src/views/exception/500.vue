<!--
 * @Author: 王越
 * @date: Do not edit
 * @LastEditors: 王越
 * @LastEditTime: 2021-04-01 18:51:18
 * @Description: 123
 * @FliePath: Do not edit
-->
<template>
  <a-result status="500" title="500" sub-title="很抱歉,服务器内部错误500">
    <template #extra>
      <a-button type="primary" @click="toHome">
        返回主页
      </a-button>
    </template>
  </a-result>
</template>

<script>
  export default {
    name: 'Exception500',
    methods: {
      toHome () {
        this.$router.push({ path: '/' })
      }
    }
  }
</script>
