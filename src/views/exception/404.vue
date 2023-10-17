<!--
 * @Author: 王越
 * @date: Do not edit
 * @LastEditors: 王越
 * @LastEditTime: 2021-04-01 18:46:45
 * @Description: 123
 * @FliePath: Do not edit
-->
<template>
  <a-result status="404" title="404" sub-title="很抱歉,您访问的页面不存在.">
    <template #extra>
      <a-button type="primary" @click="toHome">
        返回主页
      </a-button>
    </template>
  </a-result>
</template>

<script>
export default {
  name: 'Exception404',
  methods: {
    toHome () {
      this.$router.push({ path: '/' })
    }
  }
}
</script>
