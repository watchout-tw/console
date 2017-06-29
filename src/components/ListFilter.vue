<template>
<div class="list-filter">
  <el-input v-if="is('input')" :placeholder="filter.label" v-model="value"></el-input>
  <el-autocomplete v-if="is('autocomplete')" :placeholder="filter.label" v-model="value" :fetch-suggestions="fetchSuggestions" @select="handleSelect"></el-autocomplete>
  <el-select v-if="is('select')" :placeholder="filter.label" v-model="value">
    <el-option v-for="item in filterOptions(filter.id)" :label="item.label" :value="item.value" :key="item.value"></el-option>
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
      filterOptions: 'filterOptions'
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
    is(type) {
      return this.filter.type === type
    },
    update() {
      this.$store.dispatch('updateFilter', {
        filterID: this.filter.id,
        directoryID: this.filter.id === 'name' ? this.page.directory : this.filter.directory
      })
    },
    fetchSuggestions(queryString, callback) {
      callback(queryString
        ? this.filterOptions(this.filter.id).filter(option => option.value.indexOf(queryString) > -1)
        : this.filterOptions(this.filter.id)
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
