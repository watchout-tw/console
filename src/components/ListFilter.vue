<template>
<div class="list-filter">
  <el-input v-if="filter.type == 'input'" :placeholder="filter.label" v-model="value"></el-input>
  <el-autocomplete v-if="filter.type == 'autocomplete'" :placeholder="filter.label" v-model="value" :fetch-suggestions="fetchSuggestions" @select="handleSelect"></el-autocomplete>
  <el-select v-if="filter.type == 'select'" :placeholder="filter.label" v-model="value">
    <el-option v-for="item in options(filter.api)" :label="item.label" :value="item.value" :key="item.value"></el-option>
  </el-select>
</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: ['page', 'filter'],
  data() {
    return {
      value: undefined
    }
  },
  computed: {
    ...mapGetters({
      options: 'options'
    })
  },
  mounted() {
    this.update()
  },
  watch: {
    'page.id'() {
      this.update()
    }
  },
  methods: {
    update() {
      // 拿 Filter 內容
      if (this.filter.id === 'name') {
        this.$store.dispatch('updateNameFilter', {
          pageID: this.page.id,
          filterID: this.filter.api
        })
      } else { // if(this.filter.type === 'select') {
        this.$store.dispatch('updateSelectedFilter', {
          filterID: this.filter.api
        })
      }
    },
    fetchSuggestions(queryString, callback) {
      callback(queryString
        ? this.options(this.filter.api).filter(option => option.value.indexOf(queryString) > -1)
        : this.options(this.filter.api)
      )
    },
    handleSelect() {}
  }
}
</script>

<style lang="scss">
.list-filter:not(:last-of-type) {
  margin-right: 0.5rem;
}
</style>
