<template>
<div id="app">
  <NavigationWithIdentity :channel="channel" :menu="menu"></NavigationWithIdentity>
  <ModalAuth v-if="modalAuthIsShown"></ModalAuth>
  <ModalResetPassword v-if="modalResetPasswordIsShown"></ModalResetPassword>
  <ModalIdentity v-if="modalIdentityIsShown"></ModalIdentity>
  <router-view></router-view>
</div>
</template>

<script>
import * as util from 'common/src/lib/util'
import dataStore from 'common/src/lib/dataStore'
import NavigationWithIdentity from 'common/src/components/Navigation/Identity'
import ModalAuth from 'common/src/components/Modal/Auth'
import ModalResetPassword from 'common/src/components/Modal/ResetPassword'
import ModalIdentity from 'common/src/components/Modal/Identity'
import menu from '@/menu'

export default {
  name: 'app',
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
    modalResetPasswordIsShown() {
      return this.$store.state.modalResetPasswordIsShown
    },
    modalIdentityIsShown() {
      return this.$store.state.modalIdentityIsShown
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
    ModalResetPassword,
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
</style>
