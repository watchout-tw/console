<template>
<div id="app">
  <NavigationWithIdentity :channel="channel" :menu="menu"></NavigationWithIdentity>
  <router-view></router-view>
  <ModalAuth v-if="modalAuthIsShown"></ModalAuth>
  <ModalLostPwd v-if="modalLostPwdIsShown"></ModalLostPwd>
  <ModalResetPwd v-if="modalResetPwdIsShown"></ModalResetPwd>
  <ModalIdentity v-if="modalIdentityIsShown"></ModalIdentity>
</div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import * as util from 'common/src/lib/util'
import dataStore from 'common/src/lib/dataStore'
import NavigationWithIdentity from 'common/src/components/Navigation/Identity'
import ModalAuth from 'common/src/components/Modal/Auth'
import ModalLostPwd from 'common/src/components/Modal/LostPwd'
import ModalResetPwd from 'common/src/components/Modal/ResetPwd'
import ModalIdentity from 'common/src/components/Modal/Identity'
import menu from '@/menu'

export default {
  name: 'app',
  created() {
    console.log(`This is the Console App (${Vue.config.mode})`)
    if(Vue.config.mode === 'production') {
      axios.defaults.baseURL = 'https://core.watchout.tw'
      // XXX: we don't have staging api for now
    // } else if(Vue.config.mode === 'staging') {
      // axios.defaults.baseURL = 'https://staging.core.watchout.tw'
    } else {
      axios.defaults.baseURL = 'https://dev.core.watchout.tw'
    }
  },
  beforeMount() {
    this.$store.dispatch('toggleIsAuthenticated', {
      value: util.jwtTokenIsHere()
    })
  },
  computed: {
    isAuthenticated() {
      return this.$store.state.isAuthenticated
    },
    modalAuthIsShown() {
      return this.$store.state.modalAuthIsShown
    },
    modalLostPwdIsShown() {
      return this.$store.state.modalLostPwdIsShown
    },
    modalResetPwdIsShown() {
      return this.$store.state.modalResetPwdIsShown
    },
    modalIdentityIsShown() {
      return this.$store.state.modalIdentityIsShown
    }
  },
  watch: {
    'isAuthenticated'() {
      if(!this.isAuthenticated) {
        this.$router.push({name: 'hello'})
      }
    }
  },
  data() {
    return {
      channel: dataStore.channels.console,
      menu
    }
  },
  components: {
    NavigationWithIdentity,
    ModalAuth,
    ModalLostPwd,
    ModalResetPwd,
    ModalIdentity
  }
}
</script>

<style lang="scss">
@import '~element-ui/lib/theme-default/index.css';
@import '~common/src/styles/resources';
@import '~common/src/styles/main';

#app {
  padding-bottom: 4rem;
}

// ElementIO override
.el-table {
  thead > tr > th {
    padding: 0.75rem 0;
    > .cell {
      line-height: 1.5;
    }
  }
}
.el-pagination {
  margin: 1rem 0;
  padding: 0;
}
</style>
