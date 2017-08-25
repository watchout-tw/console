<template>
<div class="abstract-multi-select">
  <el-select :size="size" :placeholder="config.label" v-model="model" @change="push" clearable filterable multiple :allow-create="isCreative">
    <el-option v-for="option in options" :label="option.label" :value="option.value" :key="option.value"></el-option>
  </el-select>
</div>
</template>

<script>
import Vue from 'vue'
import Vuex from 'vuex'
import cascadeSource from '@/interfaces/cascadeSource'

Vue.use(Vuex)

export default {
  mixins: [cascadeSource],
  props: ['size', 'value', 'config', 'page'],
  data() {
    return {
      model: []
    }
  },
  computed: {
    isCreative(type) {
      return this.config.type.indexOf('creative') > -1
    },
    options() {
      return this.$store.state[this.uuid]
    }
  },
  beforeMount() {
    this.update()
  },
  watch: {
    '$route'() {
      this.update()
    },
    'value'(now, then) {
      this.pull()
    }
  },
  methods: {
    is(type) {
      return this.config.type === type
    },
    update() {
      this.pull()
      if(this.config.directory) {
        this.$store.dispatch('updateSelect', {
          directoryID: this.config.directory,
          uniqueID: this.uuid
        })
      }
    },
    pull() {
      this.model = this.value
    },
    push() {
      this.$emit('update:value', this.model)
    }
  }
}
</script>

<style lang="scss">
.abstract-multi-select > .el-select {
  width: 100%;
}
</style>
