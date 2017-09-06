<template>
<div class="abstract-select">
  <el-select :size="size" :placeholder="config.label" v-model="model" @change="push" clearable @clear="onClear" filterable :disabled="config.disabled">
    <el-option v-for="option in options" :label="option.label" :value="option.value" :key="optionUID()"></el-option>
  </el-select>
</div>
</template>

<script>
import uuid from 'uuid/v4'
import Vue from 'vue'
import Vuex from 'vuex'
import cascadeSource from '@/interfaces/cascadeSource'

Vue.use(Vuex)

export default {
  mixins: [cascadeSource],
  props: ['size', 'value', 'config', 'page'],
  data() {
    return {
      initialized: false,
      model: undefined
    }
  },
  computed: {
    options() {
      return this.$store.state[this.uuid]
    }
  },
  beforeMount() {
    this.update()
  },
  beforeDestroy() { // Remove data from store?
  },
  watch: {
    '$route'() {
      this.update()
    },
    'directory'() {
      this.update()
    },
    'parameters': {
      handler() {
        this.update()
      },
      deep: true
    },
    'value'() {
      this.pull()
      this.initialized = true
    }
  },
  methods: {
    is(type) {
      return this.config.type === type
    },
    update() {
      this.pull()
      this.$store.dispatch('updateSelect', {
        parameters: this.parameters,
        directoryID: this.directory,
        uniqueID: this.uuid
      })
    },
    pull() {
      // FIXME: This is buggy here, this.value could be null or an object
      if (!this.value) {
        this.model = this.value
      } else {
        this.model = typeof this.value === 'object'
          ? (this.value.id ? this.value.id : this.value.name)
          : this.value
      }
    },
    push() {
      this.$emit('update:value', this.model) // FIXME: This is too simple
      if(this.config.cascadeUpdate) {
        this.triggerCascade(this.uuid, this.config.id, this.config.cascadeUpdate, this.model)
      }
    },
    onClear() {
      this.model = undefined
    },
    optionUID() {
      return uuid()
    }
  }
}
</script>
