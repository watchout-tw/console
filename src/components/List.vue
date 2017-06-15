<template>
<div class="list">
  <div class="title"><h1>{{ pageTitle }}</h1></div>
  <div class="filters d-flex flex-row" v-if="filters.length > 0">
    <list-filter v-for="filter in filters" :key="filter.id" :pageID="pageID" :filter="filter"></list-filter>
  </div>
  <div class="filters" v-else>no-filter</div>
  <el-table :data="rows" style="width: 100%">
    <el-table-column type="selection" width="55"></el-table-column>
    <el-table-column v-for="column in columns" :key="column.prop" :prop="column.prop" :label="column.label" :width="column.width" :formatter="column.formatter"></el-table-column>
  </el-table>
</div>
</template>

<script>
import axios from 'axios'
import Filters from './filters'
import Lists from './lists'
import ListFilter from '@/components/ListFilter'

axios.defaults.baseURL = 'https://c0re.watchout.tw'

export default {
  props: ['pageID', 'pageTitle'],
  data() {
    return {
      filters: [],
      columns: [],
      rows: []
    }
  },
  mounted() {
    console.log('list:', this.pageID)
    this.update()
  },
  watch: {
    pageID() { // watch pageID to detect switching between pages
      this.update()
    }
  },
  methods: {
    update() {
      var self = this
      // update filters
      if(Lists[this.pageID].filters) {
        this.filters = Lists[this.pageID].filters.map(function(filter) {
          return Filters[filter]
        })
      }
      // update columns
      if(Lists[this.pageID].columns) {
        this.columns = Lists[this.pageID].columns
      }
      // get data
      console.log('get', '/console/lab/' + this.pageID)
      axios.get('/console/lab/' + this.pageID).then(function(response) {
        self.rows = response.data.rows
      }).catch(function(error) {
        console.error(error)
      })
    }
  },
  components: {
    ListFilter
  }
}
</script>

<style lang="scss">
.list {
  margin: 0 1rem;
  > .title {
    margin: 1rem 0;
  }
  > .filters {
    margin: 1rem 0;
  }
}
</style>
