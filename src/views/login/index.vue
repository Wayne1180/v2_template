<!--
 * @Author: 王欣磊
 * @Date: 2022-04-28 10:23:26
 * @LastEditors: 王欣磊
 * @LastEditTime: 2022-04-28 17:02:41
 * @Description:
 * @FilePath: /bianjian-ship/src/views/login/index.vue
-->
<template>
  <div class="container-login">
    <img class="bg" :src="bg" />
    <div class="content flex-column align-center p-t-120 p-b-120">
      <div class="pan flex-column align-center">
        <span class="pan__title">用户名密码登录</span>
        <span class="pan__divider m-t-24 m-b-48"></span>
        <a-form :form="form" layout="inline" @submit="submit">
          <a-form-item>
            <a-input
              allowClear
              placeholder="请输入用户名"
              class="field"
              v-decorator="['username', { rules: [{ required: true, message: '请输入用户名' }] }]"
            >
              <a-icon slot="prefix" type="user" class="field__icon" />
            </a-input>
          </a-form-item>
          <a-form-item class="m-t-36">
            <a-input-password
              allowClear
              placeholder="请输入密码"
              class="field"
              v-decorator="['password', { rules: [{ required: true, message: '请输入密码' }] }]"
            >
              <a-icon slot="prefix" type="lock" class="field__icon" />
            </a-input-password>
          </a-form-item>
          <a-button :loading="loading" type="primary" class="m-t-148 btn" html-type="submit">登录</a-button>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script>
import { timeFix } from '@/utils/util'
import images from '@/data/images'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      bg: images.loginBg,
      form: this.$form.createForm(this, { name: 'loginForm' }),
      loading: false
    }
  },
  methods: {
    ...mapActions(['Login', 'Logout']),
    submit (e) {
      e.preventDefault()
      this.form.validateFields(async (errors, value) => {
        if (!errors) {
          value.password = this.$md5(value.password, 16)
          value.rememberMe = true
          this.loading = true
          this.Login(value)
            .then((res) => this.loginSuccess(res))
            .catch((err) => this.requestFailed(err))
            .finally(() => {
              this.loading = false
            })
        }
      })
    },
    loginSuccess () {
      this.$router.push({ path: '/' })
      // 延迟 1 秒显示欢迎信息
      setTimeout(() => {
        this.$notification.success({
          message: '欢迎',
          description: `${timeFix()}，欢迎回来`
        })
      }, 1000)
      this.isLoginError = false
    },
    requestFailed (err) {
      console.log('🚀 ~ file: index.vue ~ line 85 ~ requestFailed ~ err', err)
      this.isLoginError = true
      this.$notification['error']({
        message: '错误',
        description: (err || {}).message || '请求出现错误，请稍后再试',
        duration: 4
      })
    }
  }
}
</script>

<style scoped lang="scss">
.container-login {
  position: relative;

  width: 100%;
  height: 100%;

  background: #fff;

  .bg {
    width: 100%;
    height: 100%;

    object-fit: cover;
    object-position: 50% 50%;
  }

  .content {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    overflow: auto;

    background: linear-gradient(180deg, #151a30 0%, rgba(21, 26, 48, 0) 247.31%);
  }
}

.pan {
  flex-shrink: 0;

  width: 872px;
  padding: 48px 106px;
  padding-bottom: 56px;
  /* Note: backdrop-filter has minimal browser support */

  border-radius: 20px;
  background: linear-gradient(116.52deg, rgba(255, 255, 255, 0.27) -0.3%, rgba(255, 255, 255, 0.06) 101.68%);
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);

  backdrop-filter: blur(20px);

  &__title {
    font-family: 'PingFang SC';
    font-size: 36px;
    font-weight: 600;
    font-style: normal;
    line-height: 50px;

    color: #fff;
  }

  &__divider {
    width: 640px;
    height: 4px;

    background: linear-gradient(90deg, rgba(9, 109, 217, 0.1) 13.06%, #096dd9 50.67%, rgba(9, 109, 217, 0.1) 87.31%);
  }

  .btn {
    font-family: 'PingFang SC';
    font-size: 36px;
    font-weight: 400;
    font-style: normal;
    line-height: 50px;
    transition: all 0.2s;

    width: 660px;
    height: 84px;

    color: #fff;
    border-radius: 4px;
    background: #096dd9;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    border-color: #096dd9;
    &:active,
    &:hover {
      opacity: 0.8;
    }
    &:active {
      box-shadow: inset 4px 4px 5px rgba(0, 0, 0, 0.25);
    }
  }
}

.field {
  width: 660px;
  height: 64px;

  &__icon {
    font-size: 28px;

    color: #096dd9;
  }
}

::v-deep {
  .ant-input {
    font-family: 'PingFang SC';
    font-size: 24px;
    font-weight: 400;
    font-style: normal;
    line-height: 32px;

    box-sizing: border-box;
    height: 100% !important;
    padding-left: 80px !important;

    color: #fff;
    border: 2px solid #096dd9;
    border-radius: 4px;
    background: #151a30 !important;

    &::placeholder {
      color: rgba(255, 255, 255, 0.65);
    }

    &:focus:not(.ant-input-disabled) {
      border-color: #0776ed;
    }

    &:hover:not(.ant-input-disabled) {
      border-color: #087fff;
    }
    /* identical to box height, or 133% */
  }

  .ant-input-affix-wrapper .ant-input-prefix {
    left: 26px;
  }
  .ant-form-explain {
    font-size: 18px;
  }
  .ant-input-suffix {
    color: rgba(255, 255, 255, 0.5);
    font-size: 20px;
    & .anticon:hover {
      color: rgba(255, 255, 255, 1);
    }
  }
}
</style>
