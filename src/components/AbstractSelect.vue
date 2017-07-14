<template>
<div class="abstract-select">
  <el-select :size="size" :placeholder="config.label" v-model="tmp" @change="handleChange" clearable filterable :multiple="isMultiple" :allow-create="isCreative">
    <el-option v-for="option in options" :label="option.label" :value="option.value" :key="option.value"></el-option>
  </el-select>
</div>
</template>

<script>
import uuid from 'uuid/v4'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default {
  props: ['size', 'value', 'config', 'page'],
  data() {
    return {
      uniqueID: 'sel-' + uuid(),
      tmp: undefined
    }
  },
  computed: {
    isMultiple(type) {
      return this.config.type.indexOf('multiple') > -1
    },
    isCreative(type) {
      return this.config.type.indexOf('creative') > -1
    },
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
    },
    'value'() {
      if(typeof this.value === 'object') {
        this.tmp = this.value.id
      } else {
        this.tmp = this.value
      }
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
