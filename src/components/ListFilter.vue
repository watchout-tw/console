<template>
<div class="filter">
  <el-input v-if="filter.type == 'input'" :placeholder="filter.id" v-model="value"></el-input>
  <el-select v-if="filter.type == 'select'" :placeholder="filter.id" v-model="value">
    <el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value"></el-option>
  </el-select>
</div>
</template>

<script>
import axios from 'axios'

const CORE = 'https://apidev.watchout.tw'

export default {
  data() {
    return {
      value: '',
      options: []
    }
  },
  created() {
    var self = this
    // if(this.filter.type === 'select') {
    if(this.filter.id === 'parties') {
      const url = `${CORE}/console/lab/${this.filter.id}`
      axios.get(url).then(function(response) {
        self.options = response.data.rows.map(function(row) {
          return {
            value: row.name,
            label: row.name
          }
        })
      }).catch(function(error) {
        console.error(error)
      })
    }
  },
  props: ['pageID', 'filter']
}
</script>
