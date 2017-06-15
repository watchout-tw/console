<template>
<div class="list-filter">
  <el-input v-if="filter.type == 'input'" :placeholder="filter.label" v-model="value"></el-input>
  <el-autocomplete v-if="filter.type == 'autocomplete'" :placeholder="filter.label" v-model="value" :fetch-suggestions="fetchSuggestions" @select="handleSelect"></el-autocomplete>
  <el-select v-if="filter.type == 'select'" :placeholder="filter.label" v-model="value">
    <el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value"></el-option>
  </el-select>
</div>
</template>

<script>
import axios from 'axios'

axios.defaults.baseURL = 'https://c0re.watchout.tw'

export default {
  props: ['pageID', 'filter'],
  data() {
    return {
      value: '',
      options: []
    }
  },
  created() {
    var self = this
    if(this.filter.id === 'name') {
      const url = '/console/lab/' + this.pageID
      axios.get(url).then(function(response) {
        self.options = response.data.rows.map(row => ({
          value: row.name
        }))
      }).catch(function(error) {
        console.error(error)
      })
    } else if(this.filter.id === 'parties') { // if(this.filter.type === 'select') {
      const url = '/console/lab/' + this.filter.id
      axios.get(url).then(function(response) {
        self.options = response.data.rows.map(row => ({
          value: row.name,
          label: row.name
        }))
      }).catch(function(error) {
        console.error(error)
      })
    }
  },
  methods: {
    fetchSuggestions(queryString, callback) {
      callback(queryString
        ? this.options.filter(option => option.value.indexOf(queryString) > -1)
        : this.options
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
