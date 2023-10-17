<!--
 * @Author: 王欣磊
 * @Date: 2021-07-13 09:49:36
 * @LastEditors: 王欣磊
 * @LastEditTime: 2021-07-29 18:16:55
 * @Description:
 * @FilePath: /jsmsa-report/src/components/Tree/layouts/UDModal.vue
-->
<template>
  <a-modal v-model="show" :title="mode === 'C' ? '新增节点' : '修改节点'">
    <template slot="footer">
      <div class="flex-row justify-center">
        <a-button @click="handleSubmit" key="submit" type="primary" style="border-radius:6px" :loading="loading">
          确定
        </a-button>
        <a-button @click="show = false" key="back" style="border-radius:6px;">
          取消
        </a-button>
      </div>
    </template>
    <a-form :form="form" style="min-width:100%" :label-col="{ span: 5 }" :wrapper-col="{ span: 18, offset: 1 }">
      <a-row type="flex" align="middle">
        <a-col :span="24" v-if="mode === 'C'">
          <a-form-item label="父节点名称">
            <a-input :value="instance.name" disabled></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="当前节点名称">
            <a-input
              v-decorator="[
                'name',
                {
                  rules: [{ required: true, message: '请输入节点名称' }],
                  validateTrigger: 'blur',
                  initialValue: mode === 'D' ? instance.name : ''
                }
              ]"
            ></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="图标选择">
            <icon-select
              v-decorator="['icon', { rules: [{ required: true, message: '请选择图标' }], validateTrigger: 'blur' }]"
            ></icon-select>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>

<script>
import IconSelect from '@/components/IconSelect'
export default {
  components: {
    IconSelect
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    instance: {
      type: Object,
      default: () => {
        return {}
      }
    },
    mode: {
      type: String,
      default: 'C'
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      show: this.value,
      form: this.$form.createForm(this, { name: 'dispatchModal' })
    }
  },
  methods: {
    // 回显
    setFields (fields) {
      this.$nextTick(() => {
        this.form.setFieldsValue(fields)
      })
    },
    // 重置
    reset () {
      this.form.resetFields()
    },
    handleSubmit (e) {
      console.log('🚀 ~ file: DispatchModal.vue ~ line 73 ~ handleSubmit ~ e')
      this.form.validateFields((errors, values) => {
        if (errors === null) {
          this.$emit('ok', this.mode, values)
        }
        // console.log(errors, values)
      })
    }
  },
  watch: {
    value (val) {
      this.show = val
    },
    show (val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style scoped lang="scss"></style>
