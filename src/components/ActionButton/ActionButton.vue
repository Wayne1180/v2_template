<!--
 * @Author: 王欣磊
 * @Date: 2022-04-26 13:37:58
 * @LastEditors: 王欣磊
 * @LastEditTime: 2022-05-12 10:32:38
 * @Description:
 * @FilePath: /bianjian-ship/src/components/ActionButton/ActionButton.vue
-->
<template>
  <div class="container-cab" @click="handleClick" :title="iconEnums[type].title">
    <icon-font class="icon" v-bind="$attrs">{{ iconEnums[type].name }}</icon-font>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'view'
    },
    disabledMessage: {
      type: String,
      default: '禁止操作'
    }
  },
  data () {
    return {
      iconEnums: {
        view: { title: '详情', name: 'chakanxiangqing' },
        delete: { title: '删除', name: 'shanchu' },
        edit: { title: '编辑', name: 'bianji' },
        photo: { title: '图片管理', name: 'tupianbianji' }
      }
    }
  },
  methods: {
    handleClick () {
      const { $attrs, $message, disabledMessage } = this
      if ($attrs?.disabled) {
        $message.info(disabledMessage)
      } else {
        this.$emit('click')
      }
    }
  }
}
</script>

<style scoped lang="scss">
.container-cab {
  transition: all 0.2s;

  &:hover,
  &:active {
    opacity: 0.8;
  }

  .icon {
    font-size: 24px;

    cursor: pointer;
  }
}
</style>
