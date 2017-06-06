<template>
<nav class="navbar sticky-top navbar-light">
  <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <el-menu-item index="0">Console</el-menu-item>
    <el-submenu v-for="(firstLevelItem, firstLevelItemIndex) in menu" :index="(firstLevelItemIndex + 1).toString()" :key="firstLevelItem.id">
      <template slot="title">{{ firstLevelItem.name }}</template>
      <el-menu-item v-for="(item, index) of firstLevelItem.pages" :index="(firstLevelItemIndex + 1) + '-' + (index + 1)" :key="item.id">
        <a :href="item.id">{{ item.name }}</a>
      </el-menu-item>
    </el-submenu>
  </el-menu>
</nav>
</template>

<script>
export default {
  data() {
    return {
      menu: this.$parent.$data.menu,
      activeIndex: '0'
    }
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
