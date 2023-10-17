<!--
 * @Author: 王欣磊
 * @Date: 2022-04-21 14:27:40
 * @LastEditors: 王欣磊
 * @LastEditTime: 2022-08-05 16:16:15
 * @Description:
 * @FilePath: /labor/src/layouts/SubMenu.vue
-->
<template>
  <a-sub-menu :key="menuInfo.key" v-bind="$props" v-on="$listeners">
    <span slot="title" class="p-l-14 slot-title" >
      <span class="anticon">
        <icon-font class="icon-p">{{ menuInfo.icon }}</icon-font>
      </span>
      <span class="title-p">{{ menuInfo.title }}</span>
    </span>
    <template v-for="item in menuInfo.children.filter((_) => !$get(_, 'meta.hide'))">
      <a-menu-item
        v-if="!item.children || item.children.every((_) => $get(_, 'meta.hide'))"
        :key="item.key"
        class="flex-row align-center"
      >
        <!-- <span class="anticon">
          <icon-font class="icon-s">{{ $route.name === item.key ? 'circle-fill' : 'circle' }}</icon-font>
        </span> -->
        <span class="title-s" :class="{ active: $route.name === item.key }">{{ item.title }}</span>
      </a-menu-item>
      <sub-menu v-else :key="item.key" :menu-info="item" />
    </template>
  </a-sub-menu>
</template>

<script>
import { Menu } from 'ant-design-vue'

export default {
  name: 'SubMenu',
  // must add isSubMenu: true
  isSubMenu: true,
  props: {
    collapsed: {
      type: Boolean,
      default: false
    },
    ...Menu.SubMenu.props,
    // Cannot overlap with properties within Menu.SubMenu.props
    menuInfo: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style scoped lang="scss">
.icon-p {
  font-size: 16px;

  color: rgba(255, 255, 255, .85);
}

.title-p {
  font-family: 'PingFang SC';
  font-size: 14px;
  font-weight: 400;
  font-style: normal;
  line-height: 22px;

  margin-left: 8px;
}

.icon-s {
  font-size: 8px;
}

.title-s {
  font-family: 'PingFang SC';
  font-size: 14px;
  font-weight: 400;
  font-style: normal;
  line-height: 22px;

  margin-left: 30px;

  &.active {
    font-family: 'Alibaba PuHuiTi';
    font-size: 14px;
    /* identical to box height, or 157% */

    color: #fff;
    /* identical to box height, or 157% */

    mix-blend-mode: normal;
  }
}

::v-deep {
  .ant-menu-submenu-title {
    padding-left: 9px !important;
  }

  .ant-menu-sub.ant-menu-inline .ant-menu-item {
    padding-left: 26px !important;

    &.ant-menu-item-selected {
      // border-radius: 4px;
      // background: #e6f7ff;

      &::after {
        display: none;
      }
    }
  }

}

</style>
