<template>
<div class="list">
  <div class="title d-flex justify-content-between align-items-center"><h1 class="small">{{ page.title }}</h1><el-button type="primary"><router-link :to="{ name: page.createRouteName }">新增{{ page.name }}</router-link></el-button></div>
  <div class="filters d-flex flex-row" v-if="filters.length > 0">
    <list-filter v-for="filter in filters" :key="filter.id" :page="page" :filter="filter"></list-filter>
  </div>
  <div class="filters" v-else>無法過濾</div>
  <el-table :data="rows">
    <el-table-column v-for="column in columns" :key="column.prop" :prop="column.prop" :label="column.label" :sortable="column.flags ? column.flags.sortable : false" :width="column.width" :formatter="column.formatter"></el-table-column>
  </el-table>
  <el-pagination v-if="paged" layout="prev, pager, next" :current-page.sync="paging.page" :page-size="paging.pageSize" :total="totalRowCount"></el-pagination>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import lists from '@/config/lists'
import listFilters from '@/config/listFilters'
import ListFilter from '@/components/ListFilter'

export default {
  props: ['page'],
  data() {
    return {
      paged: false,
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
      console.log('List:', this.page.id)
      this.paged = lists[this.page.id].paged

      // update filters
      this.filters = lists[this.page.id].filters.map(function(filterID) {
        return listFilters[filterID]
      })

      // update columns
      this.columns = lists[this.page.id].columns

      // dispatch action to get data
      if (lists[this.page.id].paged) {
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
