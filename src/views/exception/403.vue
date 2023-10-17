<!--
 * @Author: 王越
 * @date: Do not edit
 * @LastEditors: 王越
 * @LastEditTime: 2021-04-01 19:28:09
 * @Description: 123
 * @FliePath: Do not edit
-->
<template>
  <a-result status="403" title="403" sub-title="很抱歉,您没有权限访问该页面!">
    <template #extra>
      <a-button type="primary" @click="toHome">
        返回主页
      </a-button>
    </template>
  </a-result>
</template>

<script>
export default {
  name: 'Exception403',
  methods: {
    toHome () {
      this.$router.push({ path: '/' })
    }
  }
}
</script>
