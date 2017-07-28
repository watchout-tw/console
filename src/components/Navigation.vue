<template>
<nav class="navbar sticky-top navbar-light">
  <el-menu theme="dark" :router="true" :default-active="activeIndex" mode="horizontal" @select="handleSelect">
    <el-menu-item :index="root">中控室</el-menu-item>
    <el-submenu v-for="(group, groupIndex) in menu" :index="root + group.id" :key="group.id">
      <template slot="title">{{ group.name }}</template>
      <el-menu-item v-for="(page, index) of group.pages" :index="root + page.id" :key="page.id">
        <router-link :to="{ name: page.routes.list.name }">{{ page.title }}</router-link>
      </el-menu-item>
    </el-submenu>
    <el-menu-item :index="login" @click="toggleModalAuth">草民王登入</el-menu-item>
  </el-menu>
</nav>
</template>

<script>
export default {
  props: ['menu', 'modalAuthIsShown'],
  data() {
    return {
      root: '/',
      // FIXME: this modal should be a button instead of a menu with routing
      login: '/login'
    }
  },
  created() {
    this.activeIndex = this.$route.path
  },
  methods: {
    handleSelect(key, keyPath) {
      this.activeIndex = this.root + key
    },
    toggleModalAuth() {
      this.$emit('update:modalAuthIsShown', !this.modalAuthIsShown)
    }
  }
}
</script>

<style lang="scss">
.el-menu {
  border-radius: 0;
}
// FIXME: This is temporary.
.el-menu--dark {
  background-color: #333;
}
.el-menu--horizontal.el-menu--dark .el-menu-item:hover,
.el-menu--horizontal.el-menu--dark .el-submenu__title:hover {
  background-color: #505050;
}
</style>
