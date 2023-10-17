<!--
 * @Author: 王欣磊
 * @Date: 2022-04-21 15:00:11
 * @LastEditors: 王欣磊
 * @LastEditTime: 2022-09-09 10:21:20
 * @Description:
 * @FilePath: /antd-pro-min/src/layouts/CMenu.vue
-->
<template>
  <a-menu
    @click="handleClickMenuItem"
    @openChange="handleMenuOpenChange"
    :openKeys="openKeys"
    :selectedKeys="selectedKeys"
    :forceSubMenuRender="true"
    mode="inline"
    theme="dark"
    style="background: #000d17"
    :inlineIndent="0"
  >
    <template v-for="item in listAll.filter((_) => !$get(_, 'meta.hide'))">
      <a-menu-item
        v-if="!item.children || item.children.every((_) => $get(_, 'meta.hide'))"
        :key="item.key"
        :class="{ collapsed }"
      >
        <span class="anticon">
          <icon-font class="icon-p">{{ item.icon }}</icon-font>
        </span>
        <span class="title-p">{{ item.title }}</span>
      </a-menu-item>
      <sub-menu v-else :collapsed="collapsed" :key="item.key" :menu-info="item" />
    </template>
  </a-menu>
</template>

<script>
import SubMenu from '@/layouts/SubMenu'
import { asyncRouterMap } from '@/config/router.config'
import omit from 'lodash/omit'
import store from '@/store'
const getAllParentKey = function (list, key) {
  for (const i in list) {
    if (list[i].key === key) {
      // 查询到返回该数组对象
      return [list[i].key]
    }
    if (list[i].children) {
      const node = getAllParentKey(list[i].children, key)
      if (node !== undefined) {
        // 查询到把父节点连起来
        return node.concat(list[i].key)
      }
    }
  }
}
function hasPermission (route) {
  if (route.meta && route.meta.permission) {
    const permission = store.state?.user?.roles?.permissionList
    let flag = false
    for (let i = 0, len = permission.length; i < len; i++) {
      flag = route.meta.permission.includes(permission[i])
      if (flag) {
        return true
      }
    }
    return false
  }
  return true
}
export default {
  props: {
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  components: {
    SubMenu
  },
  data () {
    return {
      openKeys: [],
      selectedKeys: []
    }
  },
  computed: {
    listAll () {
      const convertChild = (item) => {
        if (item.children) {
          item.children = item.children
            .filter((_) => {
              return hasPermission(_)
            })
            .map(convertChild)
        }
        return omit({ ...item, title: item.meta.title, key: item.name }, 'component')
      }
      return asyncRouterMap[0].children
        .filter((_) => {
          return hasPermission(_)
        })
        .map((_) => {
          return convertChild(_)
        })
    }
  },
  methods: {
    handleMenuOpenChange (openKeys) {
      const latestOpenKey = openKeys.find((key) => !this.openKeys.includes(key))
      this.openKeys = latestOpenKey ? [latestOpenKey] : []
    },
    // 查找所有父节点
    handleClickMenuItem (item) {
      console.log('🚀 ~ file: CMenu.vue ~ line 80 ~ handleClickMenuItem ~ item', item)
      this.$router.push({ name: item.key })
    }
  },
  watch: {
    $route ({ name, meta }) {
      const parents = getAllParentKey(this.listAll, name)
      this.openKeys = parents
      // if (meta?.hide) {
      // this.selectedKeys = [parents[1], name]
      // } else {
      this.selectedKeys = [name]
      // }
    }
  },
  created () {
    const parents = getAllParentKey(this.listAll, this.$route.name)
    this.openKeys = parents
    // if (this.$route?.meta?.hide) {
    // this.selectedKeys = [parents[1], this.$route.name]
    // console.log('🚀 ~ file: CMenu.vue ~ line 113 ~ created ~ this.selectedKeys', this.selectedKeys)
    // } else {
    this.selectedKeys = [this.$route.name]
    // }
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

::v-deep {

  .ant-menu-submenu[collapsed='true'] .ant-menu-submenu-title {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    padding: 0 !important;
  }

  .ant-menu-item.collapsed {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    padding: 0 !important;
  }

  // .ant-menu-submenu-selected {
  //   color: unset;
  // }

  .ant-menu-item {
    &:not(.collapsed) {
      padding-left: 23px !important;
    }

    &.collapsed {
      padding-left: 13px !important;
    }

    &.ant-menu-item-selected {
      background: #1890ff;

      .title-p {
        font-family: 'PingFang SC';
        font-size: 14px;
        font-weight: bold;
        /* identical to box height, or 157% */

        color: #fff;
      }

      &::after {
        display: none;
      }
    }
  }
}

</style>
<style>
  .ant-menu-inline-collapsed {
    position: relative;
    left: -5px;

    width: calc(100% + 5px);
  }
</style>
