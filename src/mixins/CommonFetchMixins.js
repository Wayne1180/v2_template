/*
 * @Author: 王欣磊
 * @Date: 2021-03-26 12:15:15
 * @LastEditors: 王欣磊
 * @LastEditTime: 2022-05-19 15:38:26
 * @Description:
 * @FilePath: /bianjian-ship/src/mixins/CommonFetchMixins.js
 */
import _ from 'lodash'
export default {
  data () {
    return {
      tempParams: {},
      pagination: {
        pageSize: 10,
        current: 1,
        total: 0,
        'show-size-changer': true,
        'show-quick-jumper': true,
        'show-total': (total) => `共 ${total} 条`
      },
      data: [],
      loading: false,
      exportLoading: false,
      selectedRowKeys: [],
      RowSelection: {
        selectedRowKeys: [],
        onChange: (selectedRowKeys) => {
          this.RowSelection.selectedRowKeys = selectedRowKeys
        }
      },
      sorter: {
        sortOrder: '',
        sortField: ''
      }
    }
  },
  created () {
    // 默认排序 受控
    const sorterFields = this.$ia(this.columns) && this.columns.filter((i) => i.controlledSorter)
    if (this.$ia(sorterFields)) {
      this.sorter.sortField = sorterFields[0].dataIndex
      this.sorter.sortOrder = { descend: 'DESC', ascend: 'ASC' }[sorterFields[0].sortOrder]
    }
  },
  watch: {
    RowSelection: {
      deep: true,
      handler (v) {
        this.selectedRowKeys = v.selectedRowKeys
      }
    }
  },
  methods: {
    rowClassName (record, index) {
      let className = index % 2 ? 'rowStyle1' : 'rowStyle2'
      index === this.hoverIndex && (className += ' hover')
      return className
    },
    handleTableChange (pagination, filters, sorter) {
      this.sorter.sortField = sorter.field
      this.sorter.sortOrder = { descend: 'DESC', ascend: 'ASC' }[sorter.order]
      // 受控 排序

      Array.isArray(this.columns) &&
        this.columns.map((i) => {
          if (i.controlledSorter) {
            i.sortOrder = sorter.order
          }
        })
      //
      const pager = { ...this.pagination }
      pager.current = pagination.current
      pager.pageSize = pagination.pageSize
      this.pagination = pager
      // 在data里写上fetch方法
      this.handleFetchData()
    },
    handleFetchData (params = {}, refresh = false) {
      if (!this.fetchFunction) {
        console.error('未配置fetch函数', params)
        return
      }
      refresh && (this.tempParams = {})

      this.loading = true
      const p = { ...this.tempParams, ...params }
      this.shipApplyLibraryId && (p.shipApplyLibraryId = this.shipApplyLibraryId)
      const s = (this.sorter.sortField && this.sorter.sortOrder && { ...this.sorter }) || {}
      this.fetchFunction({
        currentPage: refresh ? 1 : this.pagination.current,
        pageSize: this.pagination.pageSize,
        ...s,
        ...p
      })
        .then((res) => {
          if (this.$i(res)) {
            if (refresh) {
              this.data = []
              this.pagination.current = 1
              this.tempParams = {}
            }
            this.data = res.data

            this.pagination.total = parseInt(res.total)
          } else {
            console.error(res)
          }
        })
        .catch((e) => {
          console.error('🚀 ~ file: CommonFetchMixins.js ~ line 103 ~ handleFetchData ~ e', e)
          this.$message.error(e.toString())
        })
        .finally(() => {
          this.loading = false
          this.tempParams = _.cloneDeep(p)
          this.RowSelection.selectedRowKeys = []
        })
    },
    async handleDelete (ids, key = 'shipImgMetaIds') {
      this.$message.loading({
        content: '删除中...',
        key: 'deleteOne',
        duration: 0
      })
      const res = await this.deleteFunction({ [key]: ids }).catch((_) => {
        this.$message.error({
          content: '删除失败',
          key: 'deleteOne',
          duration: 1.5
        })
      })
      if (this.$i(res, true)) {
        if (ids.length === this.data.length && this.pagination.current === Math.ceil(this.pagination.total / this.pagination.pageSize)) {
          this.pagination.current = this.pagination.current - 1 < 1 ? 1 : this.pagination.current - 1
        }
        this.handleFetchData({})
        this.$message.success({
          content: '删除成功',
          key: 'deleteOne',
          duration: 1.5
        })
      } else {
        this.$message.error({
          content: '删除失败',
          key: 'deleteOne',
          duration: 1.5
        })
      }
    },
    async handleExport (params) {
      if (!this.exportFunction) {
        return console.error('未配置export函数')
      }
      this.exportLoading = true
      const res = await this.exportFunction(params).catch((e) => {
        this.$message.error('下载失败')
        this.exportLoading = false
      })
      this.$blob(res, this)
      this.exportLoading = false
    }
  }
}
