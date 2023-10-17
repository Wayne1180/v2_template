<!--
 * @Author: 王欣磊
 * @Date: 2021-03-13 09:24:52
 * @LastEditors: 王欣磊
 * @LastEditTime: 2021-07-07 14:38:10
 * @Description:
 * @FilePath: /vue-framework-min/src/components/Ellipsis/Ellipsis.vue
-->
<script>
import Tooltip from 'ant-design-vue/es/tooltip'
import { cutStrByFullLength, getStrFullLength } from '@/components/_util/util'
/*
    const isSupportLineClamp = document.body.style.webkitLineClamp !== undefined;

    const TooltipOverlayStyle = {
      overflowWrap: 'break-word',
      wordWrap: 'break-word',
    };
  */

export default {
  name: 'Ellipsis',
  components: {
    Tooltip
  },
  props: {
    prefixCls: {
      type: String,
      default: 'ant-pro-ellipsis'
    },
    tooltip: {
      type: Boolean
    },
    length: {
      type: Number,
      required: true
    },
    lines: {
      type: Number,
      default: 1
    },
    fullWidthRecognition: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    getStrDom (str, fullLength) {
      return (
        <span>{ cutStrByFullLength(str, this.length) + (fullLength > this.length ? '...' : '') }</span>
      )
    },
    getTooltip (fullStr, fullLength) {
      return (
        <Tooltip>
          <template slot="title">{ fullStr }</template>
          { this.getStrDom(fullStr, fullLength) }
        </Tooltip>
      )
    }
  },
  render () {
    const { tooltip, length } = this.$props
    const str = this.$slots.default && this.$slots.default.map(vNode => vNode.text).join('') || ''
    const fullLength = getStrFullLength(str)
    const strDom = tooltip && fullLength > length ? this.getTooltip(str, fullLength) : this.getStrDom(str, fullLength)
    return (
      strDom
    )
  }
}
</script>
