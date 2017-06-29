<template>
<nav class="navbar sticky-top navbar-light">
  <el-menu theme="dark" :router="true" :default-active="activeIndex" mode="horizontal" @select="handleSelect">
    <el-menu-item :index="root">主控室</el-menu-item>
    <el-submenu v-for="(group, groupIndex) in menu" :index="root + group.id" :key="group.id">
      <template slot="title">{{ group.name }}</template>
      <el-menu-item v-for="(page, index) of group.pages" :index="root + page.id" :key="page.id">
        <router-link :to="{ name: page.routes.list.name }">{{ page.title }}</router-link>
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
      root: '/'
    }
  },
  created() {
    this.activeIndex = this.$route.path
  },
  methods: {
    handleSelect(key, keyPath) {
      this.activeIndex = this.root + key
    }
  }
}
</script>
