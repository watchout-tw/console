<template>
<div class="list-filter">
  <el-input v-if="is('input')" :placeholder="config.label" v-model="tmp" @change="handleChange"></el-input>
  <el-autocomplete v-if="is('autocomplete')" :placeholder="config.label" v-model="tmp" @change="handleChange" :fetch-suggestions="fetchSuggestions"></el-autocomplete>
  <el-select v-if="is('select')" :placeholder="config.label" v-model="tmp" @change="handleChange">
    <el-option v-for="item in filterOptions(config.id)" :label="item.label" :value="item.value" :key="item.value"></el-option>
  </el-select>
</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: ['model', 'config', 'page'],
  data() {
    return {
      tmp: undefined
    }
  },
  computed: {
    ...mapGetters({
      filterOptions: 'filterOptions'
    })
  },
  mounted() {
    this.update()
  },
  watch: {
    'page.id'() {
      this.update()
    }
  },
  methods: {
    is(type) {
      return this.config.type === type
    },
    update() {
      if(this.config.type !== 'input') {
        this.$store.dispatch('updateFilter', {
          filterID: this.config.id,
          directoryID: this.config.id === 'name' ? this.page.directory : this.config.directory
        })
      }
    },
    fetchSuggestions(queryString, callback) {
      callback(queryString
        ? this.filterOptions(this.config.id).filter(option => option.value.indexOf(queryString) > -1)
        : this.filterOptions(this.config.id)
      )
    },
    handleChange(now) {
      this.$emit('update:value', this.tmp)
    }
  }
}
</script>

<style lang="scss">
.list-filter:not(:last-of-type) {
  margin-right: 0.5rem;
}
</style>
