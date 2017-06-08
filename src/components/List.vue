<template>
<div class="list">
  <h1>{{ pageTitle }}</h1>
  <div class="filters d-flex flex-row" v-if="filters.length > 0">
    <list-filter v-for="filter in filters" :key="filter.id" :pageID="pageID" :filter="filter"></list-filter>
  </div>
  <div v-else>no-filter</div>
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

export default {
  props: ['pageID', 'pageTitle'],
  data() {
    return {
      filters: []
    }
  },
  mounted() {
    console.log('list:', this.pageID)
    this.updateFilters()
  },
  watch: {
    pageID() {
      this.updateFilters()
    }
  },
  methods: {
    updateFilters() {
      if(filtersPerList[this.pageID]) {
        this.filters = filtersPerList[this.pageID].map(function(filter) {
          return allFilters[filter]
        })
      }
    }
  },
  components: {
    ListFilter
  }
}
</script>
