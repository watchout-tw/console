<template>
<div class="abstract-multi-select">
  <el-select :size="size" :placeholder="config.label" v-model="tmp" @change="handleChange" clearable filterable multiple :allow-create="isCreative">
    <el-option v-for="option in options" :label="option.label" :value="option.value" :key="option.value"></el-option>
  </el-select>
</div>
</template>

<script>
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default {
  props: ['size', 'value', 'uuid', 'config', 'page'],
  data() {
    return {
      tmp: []
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
      this.syncModel()
    }
  },
  methods: {
    is(type) {
      return this.config.type === type
    },
    update() {
      this.syncModel()
      if(this.config.directory) {
        this.$store.dispatch('updateSelect', {
          directoryID: this.config.directory,
          uniqueID: this.uuid
        })
      }
    },
    syncModel() {
      this.tmp = this.value
    },
    handleChange() {
      this.$emit('update:value', this.tmp)
      if(!this.config.cascadeUpdate) {
        return
      }
      for(let updateTarget of this.config.cascadeUpdate) {
        this.$emit('update:cascade', {
          target: updateTarget,
          directoryID: this.tmp
        })
      }
    }
  }
}
</script>
