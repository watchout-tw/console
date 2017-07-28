<template>
<div id="app">
  <navigation :menu="menu"></navigation>
  <router-view></router-view>
</div>
</template>

<script>
import Navigation from '@/components/Navigation'
import menu from '@/menu'

export default {
  name: 'app',
  data() {
    return {
      menu
    }
  },
  components: {
    Navigation
  }
}
</script>

<style lang="scss">
@import '~element-ui/lib/theme-default/index.css';
@import '~common/src/styles/resources';
@import '~common/src/styles/main';

</style>
