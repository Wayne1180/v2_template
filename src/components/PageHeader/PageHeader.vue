<!--
 * @Author: 王欣磊
 * @Date: 2022-04-25 10:41:20
 * @LastEditors: 王欣磊
 * @LastEditTime: 2022-04-25 10:42:37
 * @Description:
 * @FilePath: /bianjian-ship/src/components/PageHeader/PageHeader.vue
-->
<template>
  <a-page-header
    class="page-header"
    :title="title"
    :breadcrumb="{
      props: {
        routes,
        itemRender: ({ route, params, routes, paths }) => {
          if (routes.indexOf(route) === routes.length - 1) {
            return this.$createElement('span', {}, route.breadcrumbName)
          } else {
            return this.$createElement('router-link', { props: { to: '/' + paths.join('/') } }, route.breadcrumbName)
          }
        },
      },
    }"
  >
  </a-page-header>
</template>

<script>
export default {
  props: {
    routes: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped lang="scss">
.page-header {
  height: 98px;

  background: #fff;
}

</style>
