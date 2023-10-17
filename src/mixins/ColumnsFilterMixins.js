/*
 * @Author: 王欣磊
 * @Date: 2022-05-12 14:40:15
 * @LastEditors: 王欣磊
 * @LastEditTime: 2022-05-16 15:03:40
 * @Description:
 * @FilePath: /bianjian-ship/src/mixins/ColumnsFilterMixins.js
 */
import cloneDeep from 'lodash/cloneDeep'
import storage from 'store'
import once from 'lodash/once'
// eslint-disable-next-line no-undef
const hash = GIT_HASH
const refreshColumnsFilter = once(function () {
  try {
    const versionNow = hash
    storage.each((_, k) => {
      if (/columns_.*/.test(k)) {
        const version = k.split('-')[1]
        if (versionNow !== version) {
          storage.remove(k)
        }
      }
    })
  } catch (error) {
    console.error(error)
  }
})

export default {
  computed: {
    filterColumns: {
      get () {
        return this.checkableColumns.filter((_) => _.checked)
      }
    }
  },
  watch: {
    checkableColumns: {
      deep: true,
      handler (v) {
        storage.set(
          `columns_${this.$route.name}-${hash}`,
          v.filter((_) => _.checked).map((_) => _.key)
        )
      }
    }
  },
  data () {
    return {
      checkableColumns: []
    }
  },
  created () {
    refreshColumnsFilter()
    const stored = storage.get(`columns_${this.$route.name}-${hash}`)
    this.checkableColumns = cloneDeep(this.columns).map((_) => ({
      ..._,
      checked: !stored || stored.length === 0 ? true : stored.includes(_.key)
    }))
  }
}
