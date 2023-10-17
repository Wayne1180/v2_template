<template>
  <a-layout id="components-layout-demo-side" style="height: 100vh">
    <a-layout-sider
      v-model="collapsed"
      collapsible
      :trigger="null"
      class="noselect blank-sider"
      v-if="$route.name !== 'login'"
    >
      <div class="flex-row align-center logo">
        LOGO!
      </div>
      <c-menu :collapsed="collapsed" />
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="h-48" style="padding: 0; background: #fff">
        <div class="h-48 p-r-24 flex-row align-center justify-end">
          <a-avatar :size="24"></a-avatar>
          <span class="m-l-8 username">用户名</span>
        </div>
      </a-layout-header>
      <a-layout-content style="margin: 0px" class="router-container" id="router-container">
        <route-view class="router-view"></route-view>
      </a-layout-content>
    </a-layout>
    <!-- <img class="footer" :src="images.footer" /> -->
  </a-layout>
</template>
<script>
import { mapGetters } from 'vuex'
import Logout from './component/Logout.vue'
import images from '@/data/images'
import RouteView from '@/layouts/RouteView'
import CMenu from '@/layouts/CMenu'
import moment from 'moment'
export default {
  components: {
    RouteView,
    CMenu,
    Logout
  },
  data () {
    return {
      collapsed: false,
      images,
      time: moment().format('YYYY-MM-DD HH:mm:ss')
    }
  },
  computed: {
    ...mapGetters({
      domTitle: 'domTitle'
    })
  },
  created () {
    this.interval = setInterval(() => {
      this.time = moment().format('YYYY-MM-DD HH:mm:ss')
    }, 1000)
  },
  destroyed () {
    this.interval && clearInterval(this.interval)
  }
}
</script>

<style scoped lang="scss">
.router-container {
  overflow-y: auto;
  // padding-bottom: 1000px;

  height: 100%;
  padding: 24px;
  padding-bottom: 65px;

  background: #f5f5f5;
}

.blank {
  &-sider {
    overflow: auto;

    height: 100%;
    padding-bottom: 48px;

    background: #001529;
    box-shadow: 1px 0 4px rgba(0, 21, 41, .15);

    & .logo {
      padding: 14px 20px;
      &__logo {
        width: 30px;
        height: 24px;
      }

      &__text {
        width: 96px;
        height: 36px;
      }
    }
  }

  &-header {
    height: 100px;

    background: linear-gradient(180deg, #151a30 0%, rgba(21, 26, 48, .1) 906%);
  }
}

.username {
  font-family: 'Alibaba PuHuiTi';
  font-size: 14px;
  line-height: 22px;
  /* identical to box height, or 157% */

  color: rgba(0, 0, 0, .65);
}

</style>
