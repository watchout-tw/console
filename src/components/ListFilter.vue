<template>
<div class="filter">
  <el-input v-if="filter.type == 'input'" :placeholder="filter.id" v-model="value"></el-input>
  <el-select v-if="filter.type == 'select'" v-model="value" :placeholder="filter.id">
    <el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value"></el-option>
  </el-select>
</div>
</template>

<script>
export default {
  data() {
    return {
      value: '',
      options: []
    }
  },
  props: ['pageID', 'filter'],
  watch: {
    pageID() {
    }
  }
}
</script>
