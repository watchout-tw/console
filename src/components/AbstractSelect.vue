<template>
<div class="abstract-select">
  <el-select :size="size" :placeholder="config.customLabel ? config.customLabel : config.label" v-model="tmp" @change="handleChange" clearable filterable>
    <el-option v-for="option in options" :label="option.label" :value="option.value" :key="option.value"></el-option>
  </el-select>
</div>
</template>

<script>
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default {
  props: ['size', 'value', 'config', 'page'],
  data() {
    return {
      tmp: undefined
    }
  },
  computed: {
    options() {
      return this.$store.state[this.config.uniqueID]
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
      if (!this.config.directory) {
        return
      }
      this.$store.dispatch('updateSelect', {
        directoryID: this.config.directory,
        uniqueID: this.config.uniqueID
      })
    },
    handleChange() {
      this.$emit('update:value', this.tmp)
      if (!this.config.cascadeUpdate) {
        return
      }
      this.$emit('update:cascade', {
        target: this.config.cascadeUpdate,
        directoryID: this.tmp
      })
    }
  }
}
</script>
