<template>
<div id="app">
  <navigation :menu="menu" :modalAuthIsShown.sync="modalAuthIsShown"></navigation>
  <ModalAuth v-if="modalAuthIsShown" :modalAuthIsShown.sync="modalAuthIsShown" :isAuthenticated.sync="isAuthenticated"></ModalAuth>
  <router-view></router-view>
</div>
</template>

<script>
import ModalAuth from 'common/src/components/Modal/Auth'
import Navigation from '@/components/Navigation'
import menu from '@/menu'

export default {
  name: 'app',
  data() {
    return {
      menu,
      modalAuthIsShown: false,
      isAuthenticated: false
    }
  },
  components: {
    ModalAuth,
    Navigation
  }
}
</script>

<style lang="scss">
@import '~element-ui/lib/theme-default/index.css';
@import '~common/src/styles/resources';
@import '~common/src/styles/main';

</style>
