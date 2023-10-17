<!--
 * @Author: 王欣磊
 * @Date: 2021-03-13 09:24:51
 * @LastEditors: 王欣磊
 * @LastEditTime: 2022-05-18 15:02:37
 * @Description:
 * @FilePath: /bianjian-ship/src/App.vue
-->
<template>
  <a-config-provider :locale="locale">
    <div id="app">
      <router-view />
    </div>
  </a-config-provider>
</template>

<script>
import { setDocumentTitle, domTitle } from '@/utils/domUtil'
import { i18nRender } from '@/locales'
import { mapGetters } from 'vuex'
import { removeWatermark, setWaterMark } from '@/utils/watermark'
import moment from 'moment'
// import storage from 'store'
// import { ACCESS_TOKEN } from '@/store/mutation-types'
export default {
  methods: {},
  data () {
    return {}
  },
  beforeCreate () {
    // storage.set(ACCESS_TOKEN, 'fake')
    // this.$store.commit('SET_TOKEN', 'fake')
  },
  mounted () {
    // if(!storage.get(ACCESS_TOKEN))
    // this.$router.push('/search/face')
    const hostname = window?.location?.hostname
    if (hostname === '192.168.101.206' || process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'MOCK') {
      setWaterMark(process.env.NODE_ENV.toUpperCase(), moment().format('YY/MM/DD HH:mm:ss'))
    }
  },
  destroyed () {
    removeWatermark()
  },
  computed: {
    ...mapGetters({
      domTitle: 'domTitle'
    }),
    locale () {
      // 只是为了切换语言时，更新标题
      const { title } = this.$route.meta
      title && setDocumentTitle(`${i18nRender(title)} - ${domTitle}`)

      return this.$i18n.getLocaleMessage(this.$store.getters.lang).antLocale
    }
  },
  watch: {
    // domTitle (val) {
    // if (!val) {
    //   return
    // }
    //
    // const to = this.$router
    // if (!to.meta || typeof to.meta.title !== 'undefined') {
    //   setDocumentTitle(val)
    // } else {
    // setDocumentTitle(`${i18nRender(to.meta.title)} - ${val}`)
    // }
    // }
  }
}
</script>
