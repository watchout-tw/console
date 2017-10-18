<template>
<div class="list">
  <div class="title d-flex justify-content-between align-items-center">
    <h1 class="small">{{ page.routes.list.title }}</h1>
    <router-link :to="{name: page.routes.edit.name, params: {id: 'create'}}"><el-button type="primary">新增{{ page.name }}</el-button></router-link>
  </div>
  <div class="filters d-flex flex-row" v-if="filters.length > 0">
    <template v-for="filter in filters">
      <abstract-select v-if="filterIs(filter, 'select')" :value.sync="query[filter.id]" :cascadeConfig="cascadeMap[0][filter.id]" :queueCascadeUpdate="queueCascadeUpdate" :config="filter" :page="page"></abstract-select>
      <div v-else class="list-filter-input">
        <el-input v-model="query[filter.id]" :placeholder="filter.label"></el-input>
      </div>
    </template>
  </div>
  <div class="filters" v-else>沒什麼好過濾的。</div>
  <el-table :data="filteredRows">
    <el-table-column v-for="column in columns" :key="column.prop" :prop="column.prop" :label="column.label" :width="column.width" :formatter="column.formatter">
      <template scope="scope">
        <div class="formatted-content" v-html="cellFormatter(column, scope)"></div>
      </template>
    </el-table-column>
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
import lists from '@/config/lists'
import AbstractSelect from '@/components/AbstractSelect'
import cascadeController from '@/interfaces/cascadeController'
import * as factory from '@/util/factory'
import * as clone from '@/util/clone'

Array.prototype.objectArrayClone = function() {
  return this.map(item => Object.assign({}, item))
}

const SITE_TITLE = '→沃草←中控室'

export default {
  metaInfo() {
    return {
      title: this.page.routes.list.title + SITE_TITLE
    }
  },
  mixins: [cascadeController],
  props: ['page'],
  data() {
    return {
      query: {},
      filters: [],
      columns: [],
      config: undefined,
      pagingInfo: clone.deepClone(this.$store.state.list.paging)
    }
  },
  computed: {
    isAuthenticated() {
      return this.$store.state.isAuthenticated
    },
    rows() {
      return this.$store.state.list.rows
    },
    paging() {
      return this.pagingInfo
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
    'isAuthenticated'() {
      this.update()
    },
    // FIXME: Should find a better approach for this
    query: {
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
      this.query = {}
      lists[this.page.id].filters.forEach(filter => {
        this.$set(this.query, filter.id, undefined)
      })

      this.filters = lists[this.page.id].filters.objectArrayClone()
      this.columns = lists[this.page.id].columns.objectArrayClone()

      this.cascadeList = this.filters
      this.cascadeInit(this.query, false, this.config.filters)
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
    generateFilteredList: debounce(function() {
      for(let key in this.query) {
        if(this.query[key] === '' || this.query[key] === null) {
          this.query[key] = undefined
        }
      }
      if(this.config.paged) {
        this.$store.dispatch('getFilteredList', {
          pageID: this.page.id,
          query: this.query
        })
      } else {
        this.$store.dispatch('filterList', {
          rows: this.rows,
          query: this.query,
          filterInfo: lists[this.page.id].filters
        })
      }
    }, 350),
    cellFormatter(column, scope) {
      function nothing(val) {
        return '<span class="null">' + val + '</span>'
      }
      let val = scope.row[scope.column.property]
      let result = val
      if(val === undefined) {
        result = nothing('?')
      } else if(val === null) {
        result = nothing('null')
      } else if(val === '') {
        result = nothing('empty')
      } else if(val.length < 1) {
        result = nothing('empty')
      } else if(column.directory) {
        result = factory.assembleOfflineDirectoryList(column.directory).filter(item => item.value === val).pop().label
      } else if(column.formatter) {
        result = column.formatter(scope.row, scope.column)
      }
      return result
    }
  },
  components: {
    AbstractSelect
  }
}
</script>

<style lang="scss">
.cell > .formatted-content {
  .link {
    text-decoration: none;
    font-size: 1.25rem;
  }
  .null {
    text-transform: uppercase;
    font-size: 0.75rem;
    opacity: 0.5;
  }
  .party-flag {
    width: 2rem;
    height: 1.75rem;
    display: block;
    border: none;
  	transform: skew(0, -20deg) scale(0.65);
  }
  ul {
    padding-left: 1.25rem;
    margin: 0.25rem 0;
  }
}
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
