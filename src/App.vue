<template>
<div id="app">
  <NavigationWithIdentity :channel="channel" :isAuthenticated.sync="isAuthenticated" :modalAuthIsShown.sync="modalAuthIsShown" :menu="menu"></NavigationWithIdentity>
  <ModalAuth v-if="modalAuthIsShown" :modalAuthIsShown.sync="modalAuthIsShown" :isAuthenticated.sync="isAuthenticated"></ModalAuth>
  <router-view></router-view>
</div>
</template>

<script>
import dataStore from 'common/src/lib/dataStore'
import NavigationWithIdentity from 'common/src/components/Navigation/Identity'
import ModalAuth from 'common/src/components/Modal/Auth'
import menu from '@/menu'

export default {
  name: 'app',
  data() {
    return {
      channel: dataStore.channels.console,
      menu,
      modalAuthIsShown: false,
      isAuthenticated: false
    }
  },
  components: {
    ModalAuth,
    NavigationWithIdentity
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
