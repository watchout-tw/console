<template>
<div class="list">
  <h1>{{ pageTitle }}</h1>
  <div class="filters d-flex flex-row" v-if="filters.length > 0">
    <list-filter v-for="filter in filters" :key="filter.id" :pageID="pageID" :filter="filter"></list-filter>
  </div>
  <div class="filters" v-else>no-filter</div>
  <el-table :data="rows" style="width: 100%">
    <el-table-column v-for="column in columns" :key="column.prop" :prop="column.prop" :label="column.label" :width="column.width"></el-table-column>
  </el-table>
</div>
</template>

<script>
import ListFilter from '@/components/ListFilter'

let allFilters = {
  name: {
    id: 'name',
    type: 'input',
    feature: 'autocomplete'
  },
  terms: {
    id: 'terms',
    type: 'select'
  },
  parties: {
    id: 'parties',
    type: 'select'
  },
  districts: {
    id: 'districts',
    type: 'select',
    feature: 'grouped'
  },
  topics: {
    id: 'topics',
    type: 'select',
    feature: 'grouped'
  },
  acts: {
    id: 'acts',
    type: 'select'
  },
  act_dirs: {
    id: 'act_dirs',
    type: 'select'
  },
  reps: {
    id: 'reps',
    type: 'input',
    feature: 'autocomplete'
  }
}
let filtersPerList = {
  terms: ['terms'],
  committees: [],
  reps: ['name', 'terms', 'parties', 'districts'],
  districts: ['terms'],
  parties: [],
  caucuses: [],
  topics: ['name'],
  acts: ['topics'],
  actFeatures: ['topics', 'acts', 'act_dirs'],
  statements: ['topics', 'terms', 'parties', 'reps'],
  sponsorships: ['topics', 'terms', 'parties', 'reps', 'acts'],
  votes: ['topics', 'terms']
}
let columnsPerList = {
  parties: [
    {
      prop: 'name',
      label: '全名'
    },
    {
      prop: 'abbreviation',
      label: '短名'
    },
    {
      prop: 'emblem',
      label: '黨旗',
      width: 100
    },
    {
      prop: 'color',
      label: '代表色',
      width: 100
    },
    {
      prop: 'actions',
      label: '操作',
      width: 100
    }
  ]
}

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
      // update filters
      if(filtersPerList[this.pageID]) {
        this.filters = filtersPerList[this.pageID].map(function(filter) {
          return allFilters[filter]
        })
      }
      // update columns
      if(columnsPerList[this.pageID]) {
        this.columns = columnsPerList[this.pageID]
      }
      // get data
    }
  },
  components: {
    ListFilter
  }
}
</script>
