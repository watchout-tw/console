<template>
<div class="list">
  <div class="title d-flex justify-content-between align-items-center">
    <h1 class="small">{{ page.routes.list.title }}</h1>
    <router-link :to="{name: page.routes.edit.name, params: {id: 'create'}}"><el-button type="primary">新增{{ page.name }}</el-button></router-link>
  </div>
  <div class="filters d-flex flex-row" v-if="filters.length > 0">
    <template v-for="filter in filters" >
      <abstract-select v-if="filterIs(filter, 'select')" :value.sync="queryParameters[filter.id]" :uuid="uuids[filter.id]" :cascade-this.sync="cascadeThis" :config="filter" :page="page"></abstract-select>
      <div v-else class="list-filter-input">
        <el-input v-model="queryParameters[filter.id]" :placeholder="filter.label" @change="generateFilteredList"></el-input>
      </div>
    </template>
  </div>
  <div class="filters" v-else>沒什麼好過濾的。</div>
  <el-table :data="filteredRows">
    <el-table-column v-for="column in columns" :key="column.prop" :prop="column.prop" :label="column.label" :width="column.width" :formatter="column.formatter"></el-table-column>
    <el-table-column width="48">
      <template scope="scope">
        <el-button type="text" size="small" icon="edit" @click="editItem(scope.row)"></el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination v-if="config.paged" layout="prev, pager, next" :current-page.sync="paging.page" :page-size="paging.pageSize" :total="totalRowCount"></el-pagination>
</div>
</template>

<script>
import debounce from 'lodash.debounce'
import Vue from 'vue'
import Vuex from 'vuex'
import lists from '@/config/lists'
import AbstractSelect from '@/components/AbstractSelect'
import TableCell from '@/components/TableCell'
import cascadeController from '@/interfaces/cascadeController'

Vue.use(Vuex)

Array.prototype.objectArrayClone = function() {
  return this.map(item => Object.assign({}, item))
}

export default {
  mixins: [cascadeController],
  props: ['page'],
  data() {
    return {
      queryParameters: {},
      filters: [],
      columns: [],
      config: undefined,
      cascadeList: undefined // mendatory for cascadeController to work
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
    this.init()
    this.update()
  },
  watch: {
    // watch page.id to detect switching between pages
    '$route'() {
      this.init()
      this.update()
    },
    'paging.page'() {
      this.update()
    },
    // FIXME: Should find a better approach for this
    queryParameters: {
      handler(now) {
        this.generateFilteredList()
      },
      deep: true
    }
  },
  methods: {
    filterIs(filter, type) {
      return filter.type === type
    },
    init() {
      console.log('List:', this.page.id)
      this.config = lists[this.page.id]
      this.config.key = this.config.key ? this.config.key : 'id'

      // construct query parameter
      this.queryParameters = {}
      lists[this.page.id].filters.forEach(filter => {
        this.$set(this.queryParameters, filter.id, undefined)
      })

      this.filters = lists[this.page.id].filters.objectArrayClone()
      this.columns = lists[this.page.id].columns.objectArrayClone()

      this.cascadeList = this.filters
      this.cascadeInit()
    },
    update() {
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
    editItem(row) {
      this.$router.push({name: this.page.routes.edit.name, params: {id: row[this.page.routingIndex]}})
    },
    generateFilteredList: debounce(function () {
      if (this.config.paged) {
        this.$store.dispatch('getFilteredList', {
          pageID: this.page.id,
          queryParameters: this.queryParameters
        })
      } else {
        this.$store.dispatch('filterList', {
          rows: this.rows,
          queryParameters: this.queryParameters,
          filterInfo: lists[this.page.id].filters
        })
      }
    }, 350)
  },
  components: {
    AbstractSelect,
    TableCell
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
    > *:not(:last-of-type) {
      margin-right: 0.5rem;
    }
  }
}
.el-pagination {
  margin: 1rem 0;
  padding: 0;
}
.list-filter-input {
  max-width: 16rem;
}
</style>
