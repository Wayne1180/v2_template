<!--
 * @Author: 王欣磊
 * @Date: 2025-07-07 15:07:29
 * @LastEditors: 王欣磊
 * @LastEditTime: 2022-05-17 14:26:49
 * @Description:
 * @FilePath: /bianjian-ship/src/components/Tree/Tree.vue
-->
<template>
  <ul
    :style="{ maxHeight: calcHeight + 'px' }"
    style="min-width: 100%; width: fit-content; height: fit-content"
    class="flex-column justify-around"
    :class="{ root: item.children }"
  >
    <li
      style="line-height: 0.125rem; display: inline-flex; min-width: 100%"
      @click="handleClickItem(item)"
      class="noselect p-t-2 p-b-2 flex-row align-center"
      v-show="showRoot || item.id !== 0"
    >
      <div class="flex-row align-center m-r-10">
        <div @click.stop="expandChildren(item)">
          <icon-font
            style="flex-shrink: 0"
            class="m-r-8 rotation"
            v-if="item.children"
            :rotation="showChildren ? 0 : -90"
          >xiala</icon-font
          >
        </div>

        <icon-font style="flex-shrink: 0" class="m-r-8" v-if="item.icon || (alwaysIcon && !item.children)">{{
          item.icon
        }}</icon-font>
        <!-- <a-tooltip :mouseLeaveDelay="0">
            <template slot="title" v-if="showToolTipMap[item.id]">{{ item.name }}</template> -->
        <div class="name" :class="{ cons: item.id === value.id }">
          {{ item.snapPos || item.name }}
        </div>
        <!-- </a-tooltip> -->

        <!-- <div
            :ref="'name-' + item.id"
            class="name"
            style="visibility:hidden;position:fixed;left:0;top:0"
            :class="{ cons: item.id === value.id }"
          >
            {{ item.name }}
          </div> -->
      </div>
      <div class="flex-row align-center" style="margin-left: auto">
        <template v-for="(i, index) in showAction ? icons : []">
          <div
            :key="index"
            @mouseenter="hover(index)"
            @mouseleave="hover(-1)"
            @click.stop="handleClickAction(i, item)"
            class="icon-wrap m-r-8"
            v-if="
              (item.id !== 0 || i === 'tianjia') && ((item.fileType !== 'FILE' && i === 'tianjia') || i !== 'tianjia')
            "
          >
            <icon-font>{{ i + (current === index ? '_HL' : '') }}</icon-font>
          </div>
        </template>
      </div>
    </li>
    <transition-group name="fadeHeight2" tag="span">
      <tree
        v-model="valueD"
        @input="$emit('input', valueD)"
        @action="$emit('action', $event)"
        @select="$emit('select', $event)"
        :showAction="showAction"
        :choosedTypes="choosedTypes"
        :canSelect="canSelect"
        :canSelectFolder="canSelectFolder"
        v-for="(_item) in showChildren ? item.children : []"
        :key="_item.id"
        :alwaysIcon="alwaysIcon"
        :item="_item"
      ></tree>
    </transition-group>
  </ul>
</template>

<script>
export default {
  name: 'Tree',
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    value: {
      type: Object,
      default: () => {}
    },
    showAction: {
      type: Boolean,
      default: true
    },
    showRoot: {
      type: Boolean,
      default: true
    },
    canSelectFolder: {
      type: Boolean,
      default: false
    },
    choosedTypes: {
      type: Array,
      default: null
    },
    alwaysIcon: {
      type: Boolean,
      default: false
    },
    canSelect: {
      type: Boolean,
      default: true
    }
  },
  created () {
    this.item.showChildren && (this.showChildren = true)
  },
  data () {
    return {
      showChildren: false,
      current: -1,
      icons: ['shanchu1', 'xiugai', 'tianjia'],
      valueD: this.value,
      showActionModal: false,
      actionInstance: {},
      actionMode: 'C',
      showToolTipMap: {}
    }
  },
  methods: {
    // handleHoverName (e, id, leave) {
    //   const dom = this.$refs['name-' + id]
    //   const showWidth = e.target.clientWidth
    //   const trueWidth = dom.clientWidth
    //   if (leave) {
    //     setTimeout(() => {
    //       this.$set(this.showToolTipMap, id, false)
    //     }, 100)
    //   } else {
    //     this.$set(this.showToolTipMap, id, showWidth && trueWidth && showWidth < trueWidth)
    //   }
    // },
    handleClickAction (type, item) {
      const that = this
      const fun = {
        tianjia: () => {
          that.$emit('action', { item, mode: 'C' })
        },
        xiugai: () => {
          that.$emit('action', { item, mode: 'U' })
        },
        shanchu1: () => {
          that.$emit('action', { item, mode: 'D' })
        }
      }
      type && typeof fun[type] === 'function' && fun[type]()
    },
    hover (i) {
      this.current = i
    },
    expandChildren (item) {
      this.showChildren = !this.showChildren
    },
    // PENDING: 如果不能选中非叶子节点
    handleClickItem (item) {
      if (!this.canSelect) {
        return
      }
      if ((item.children?.length && this.canSelectFolder && item.id !== 0) || !item.children?.length) {
        if (this.choosedTypes === null || (this.choosedTypes && this.choosedTypes.includes(item.userFolderType))) {
          this.$emit('input', item)
          this.$emit('select', item)
          this.valueD = item
        }
      }
    }
  },
  watch: {
    value (val) {
      this.valueD = val
    },
    item (val) {
      val.showChildren && (this.showChildren = true)
    }
  },
  computed: {
    calcHeight () {
      const fun = (item) => {
        if (!item) {
          return 0
        } else {
          let height = 0
          if (!item.children) {
            return 28
          }
          for (let i = 0; i < item.children.length; i++) {
            height += fun(item.children[i])
          }

          return height + 28
        }
      }
      return fun(this.item)
    }
  }
}
</script>

<style scoped lang="scss">
li {
  height: 32px;
  padding: 0;
  padding-left: 5px;

  border-radius: 4px;

  &:hover {
    background-color: #f2f2f2;
  }

  .icon-wrap:last-of-type {
    margin-right: 0 !important;
  }
}

ul {
  padding-inline-start: 20px !important;

  &.root {
    padding-inline-start: 20px !important;
    // margin-top: 8px;
  }
}

.name {
  font-size: 16px;
  font-weight: bold;
  line-height: 32px;
  // max-width: 90%;

  white-space: nowrap;

  color: #000;

  &.cons {
    color: #6196fe;
  }
}
</style>
