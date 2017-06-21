<template>
<div class="list">
  <div class="title d-flex justify-content-between align-items-center"><h1>{{ page.title }}</h1><el-button type="primary"><router-link to="/terms/create">新增{{ page.name }}</router-link></el-button></div>
  <div class="filters d-flex flex-row" v-if="filters.length > 0">
    <list-filter v-for="filter in filters" :key="filter.id" :page="page" :filter="filter"></list-filter>
  </div>
  <div class="filters" v-else>no-filter</div>
  <el-table :data="rows">
    <el-table-column type="selection" width="46"></el-table-column>
    <el-table-column v-for="column in columns" :key="column.prop" :prop="column.prop" :label="column.label" :sortable="column.flags ? column.flags.sortable : false" :width="column.width" :formatter="column.formatter"></el-table-column>
  </el-table>
  <el-pagination layout="prev, pager, next" :current-page.sync="paging.page" :page-size="paging.pageSize" :total="totalRowCount"></el-pagination>
</div>
</template>

<script>
import axios from 'axios'
import Filters from './filters'
import Lists from './lists'
import ListFilter from '@/components/ListFilter'

axios.defaults.baseURL = 'https://c0re.watchout.tw'

export default {
  props: ['page'],
  data() {
    return {
      filters: [],
      columns: [],
      rows: [],
      totalRowCount: 0,
      paging: {
        page: 1,
        pageSize: 20
      }
    }
  },
  mounted() {
    console.log('list:', this.page.id)
    this.update()
  },
  watch: {
    'page.id'() { // watch page.id to detect switching between pages
      this.update()
    },
    'paging.page'() {
      this.update()
    }
  },
  methods: {
    update() {
      var self = this
      // update filters
      if(Lists[this.page.id].filters) {
        this.filters = Lists[this.page.id].filters.map(function(filter) {
          return Filters[filter]
        })
      } else {
        this.filters = []
      }
      // update columns
      if(Lists[this.page.id].columns) {
        this.columns = Lists[this.page.id].columns
      } else {
        this.columns = []
      }
      // get data
      let url = `/console/lab/${this.page.id}?page=${this.paging.page}`
      axios.get(url).then(function(response) {
        console.log(response)
        self.rows = response.data.rows
        self.paging.pageSize = 20
        self.totalRowCount = response.data.totalRowCount
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
