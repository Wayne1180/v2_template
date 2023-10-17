<!--
 * @Author: 王欣磊
 * @Date: 2021-03-13 09:24:52
 * @LastEditors: 王欣磊
 * @LastEditTime: 2022-05-12 10:25:27
 * @Description:
 * @FilePath: /bianjian-ship/src/components/IconFont/IconFont.vue
-->
<script>
// import '/public/library/iconfont/iconfont'
export default {
  name: 'IconFont',
  props: {
    isHL: {
      type: Boolean,
      default: false
    },
    rotation: {
      type: [Number, String],
      default: '0'
    },
    disabled: {
       type: Boolean,
      default: false
    }
  },
  methods: {},
  render () {
    const { rotation } = this.$props
    let name = (this.$slots.default && this.$slots.default.map(vNode => vNode.text).join('')) || ''
    name && (name += this.$props.isHL ? '_HL' : '')
    const dom = (
      <svg class={`icon rotation ${this.disabled ? 'disabled' : ''}`} aria-hidden="true" style={`transform: rotate(${Number(rotation) || 0}deg);filter: grayscale(${this.disabled ? 1 : 0});`}>
        <use xlinkHref={`#icon-${name}`}></use>
      </svg>
    )
    return dom
  }
}
</script>
<style scoped lang="scss">
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;

  &.disabled{
    cursor: not-allowed;
  }

  &.rotation {
    transition: transform 0.15s linear;
  }
}
</style>
