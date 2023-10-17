<!--
 * @Author: 王欣磊
 * @Date: 2022-04-28 15:55:12
 * @LastEditors: 王欣磊
 * @LastEditTime: 2022-04-28 16:52:00
 * @Description:
 * @FilePath: /bianjian-ship/src/layouts/component/Logout.vue
-->
<template>
  <div class="flex-row align-center con c-p" @click="logout">
    <icon-font class="icon">exit</icon-font>
    <span class="text m-l-8">退出登录</span>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions(['Logout']),
    logout () {
      const that = this
      this.$confirm({
        title: '确定要退出登录吗?',
        okType: 'danger',
        onOk () {
          that.Logout().finally(() => {
              that.$router.push('/login')
          })
        },
        onCancel () {}
      })
    }
  }
}
</script>

<style scoped lang="scss">
.con {
  transition: all .2s;

  .icon {
    font-size: 23px;

    color: #fff;
  }

  &:hover,
  &:active {
    opacity: .8;
  }

  .text {
    font-family: 'PingFang SC';
    font-size: 16px;
    font-weight: 400;
    font-style: normal;
    line-height: 22px;

    color: #fff;
  }
}

</style>
