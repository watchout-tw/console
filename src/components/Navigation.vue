<template>
<nav class="navbar sticky-top navbar-light">
  <el-menu theme="dark" :router="true" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <el-menu-item index="/">Console</el-menu-item>
    <el-submenu v-for="(group, groupIndex) in menu" :index="group.id" :key="group.id">
      <template slot="title">{{ group.name }}</template>
      <el-menu-item v-for="(page, index) of group.pages" :index="page.id" :key="page.id">
        <router-link :to="page.id">{{ page.title }}</router-link>
      </el-menu-item>
    </el-submenu>
  </el-menu>
</nav>
</template>

<script>
export default {
  props: ['menu'],
  data() {
    return {
      activeIndex: '/'
    }
  },
  created() {
    this.activeIndex = (this.$route.name === 'hello' ? '/' : this.$route.name)
  },
  methods: {
    handleSelect(key, keyPath) {
      this.activeIndex = key
    }
  }
}
</script>

<style lang="scss">
</style>
