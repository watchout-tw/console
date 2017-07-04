<template>
<div class="list">
  <div class="title d-flex justify-content-between align-items-center">
    <h1 class="small">{{ page.routes.list.title }}</h1>
    <el-button type="primary"><router-link :to="{name: page.routes.edit.name, params: {id: 'create'}}">新增{{ page.name }}</router-link></el-button>
  </div>
  <div class="filters d-flex flex-row" v-if="filters.length > 0">
    <list-filter v-for="filter in filters" :key="filter.id" :value.sync="queryParameters[filter.id]" :config="filter" :page="page" ></list-filter>
  </div>
  <div class="filters" v-else>沒什麼好過濾的。</div>
  <el-table :data="filteredRows">
    <el-table-column v-for="column in columns" :key="column.prop" :prop="column.prop" :label="column.label" :width="column.width" :formatter="column.formatter"></el-table-column>
    <el-table-column width="48">
      <template scope="scope">
        <router-link :to="editItemLink(scope.$index, scope.row)"><el-button type="text" size="small" icon="edit"></el-button></router-link>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination v-if="config.paged" layout="prev, pager, next" :current-page.sync="paging.page" :page-size="paging.pageSize" :total="totalRowCount"></el-pagination>
</div>
</template>

<script>
import Vue from 'vue'
import Vuex from 'vuex'
import lists from '@/config/lists'
import listFilters from '@/config/listFilters'
import ListFilter from '@/components/ListFilter'

Vue.use(Vuex)

export default {
  props: ['page'],
  data() {
    return {
      filters: [],
      columns: [],
      queryParameters: {},
      config: undefined
    }
  },
  computed: {
    rows() {
      return this.$store.state.list.rows
    },
    paging() {
      return this.$store.state.list.paging
    },
    totalRowCount() {
      return this.$store.state.list.totalRowCount
    },
    filteredRows() {
      return this.$store.state.list.filteredRows
    }
  },
  beforeMount() {
    this.update()
  },
  watch: {
    'page.id'() { // watch page.id to detect switching between pages
      this.update()
    },
    'paging.page'() {
      this.update()
    },
    queryParameters: {
      handler(now) {
        this.generateFilteredList()
        console.log('query updated', now)
      },
      deep: true
    }
  },
  methods: {
    update() {
      console.log('List:', this.page.id)
      this.config = lists[this.page.id]
      this.config.key = this.config.key ? this.config.key : 'id'

      // construct query parameter
      this.queryParameters = {}
      lists[this.page.id].filters.forEach(filter => {
        this.$set(this.queryParameters, filter.id, undefined)
      })

      // update filters
      this.filters = lists[this.page.id].filters.map(filter => {
        return Object.assign({}, filter, listFilters[filter.id])
      })

      // update columns
      this.columns = lists[this.page.id].columns

      // dispatch action to get data
      if(this.config.paged) {
        this.$store.dispatch('updateList', {
          pageID: this.page.id,
          page: this.paging.page
        })
      } else {
        this.$store.dispatch('updateListNoPaging', {
          pageID: this.page.id
        })
      }
    },
    editItemLink($index, row) {
      return this.$route.fullPath + '/' + $index // row[this.config.key]
      // this is temporary until /list/:id is ready
    },
    generateFilteredList() {
      if(this.config.paged) {
        console.log('an api call is needed')
      } else {
        this.$store.dispatch('filterList', {
          rows: this.rows,
          queryParameters: this.queryParameters,
          filterInfo: lists[this.page.id].filters
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
.el-pagination {
  margin: 1rem 0;
  padding: 0;
}
</style>
