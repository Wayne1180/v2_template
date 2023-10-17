<!--
 * @Author: 王欣磊
 * @Date: 2022-06-23 16:08:22
 * @LastEditors: 王欣磊
 * @LastEditTime: 2022-10-09 11:56:56
 * @Description:
 * @FilePath: /ant-pro-admin-min/src/views/setting/user/index.vue
-->
<template>
  <div class="flex-column">
    <span>USER {{ a?.b || 'Optional Chaining ' }}</span>
    <a-button @click="handleClickMock" class="btn">Mock Me</a-button>
  </div>
</template>

<script>
import { mockable } from '@/utils/request'
export default {
  data () {
    return {
      count: 0
    }
  },
  methods: {
    async handleClickMock () {
      this.count++
      const res = await this.$http(
        {
          url: mockable('/mock'),
          params: { key: this.count }
        }
      ).catch((e) => {})
      if (this.$i(res)) {
        this.$message.info(res.data)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.btn {
  display: inline-block;

  width: fit-content;
}

</style>
