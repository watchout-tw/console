<template>
<div class="list">
  <div class="title d-flex justify-content-between align-items-center"><h1>{{ page.title }}</h1><el-button type="primary"><router-link to="/terms/create">新增{{ page.name }}</router-link></el-button></div>
  <div class="filters d-flex flex-row" v-if="filters.length > 0">
    <list-filter v-for="filter in filters" :key="filter.id" :page="page" :filter="filter"></list-filter>
  </div>
  <div class="filters" v-else>no-filter</div>
  <el-table :data="rows">
    <el-table-column v-for="column in columns" :key="column.prop" :prop="column.prop" :label="column.label" :sortable="column.flags ? column.flags.sortable : false" :width="column.width" :formatter="column.formatter"></el-table-column>
  </el-table>
  <el-pagination layout="prev, pager, next" :current-page.sync="paging.page" :page-size="paging.pageSize" :total="totalRowCount"></el-pagination>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import Filters from './filters'
import Lists from './lists'
import ListFilter from '@/components/ListFilter'

export default {
  props: ['page'],
  data() {
    return {
      filters: [],
      columns: []
    }
  },
  computed: {
    ...mapGetters({
      rows: 'rows',
      paging: 'paging',
      totalRowCount: 'totalRowCount'
    })
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
      // dispatch action to get data
      if (Lists[this.page.id].paged) {
        this.$store.dispatch('updateList', {
          pageID: this.page.id,
          page: this.paging.page
        })
      } else {
        this.$store.dispatch('updateListNoPaging', {
          pageID: this.page.id
        })
      }
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
