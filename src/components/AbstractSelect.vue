<template>
<el-select :placeholder="config.label" v-model="tmp" @change="handleChange" :filterable="config.feature ? config.feature.filterable : false">
  <el-option v-for="option in options" :label="option.label" :value="option.value" :key="option.value"></el-option>
</el-select>
</template>

<script>
import uuid from 'uuid/v4'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default {
  props: ['value', 'config', 'page'],
  data() {
    return {
      uniqueID: 'sel-' + uuid(),
      tmp: undefined
    }
  },
  computed: {
    options() {
      return this.$store.state[this.uniqueID]
    }
  },
  beforeMount() {
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
      this.$store.dispatch('updateSelect', {
        directoryID: this.config.directory,
        uniqueID: this.uniqueID
      })
    },
    handleChange() {
      this.$emit('update:value', this.tmp)
    }
  }
}
</script>
