<template>
<div class="abstract-select">
  <el-select :size="size" :placeholder="config.label" v-model="model" @change="push" clearable filterable :disabled="config.disabled">
    <el-option v-for="option in options" :label="option.label" :value="option.value" :key="option.value"></el-option>
  </el-select>
</div>
</template>

<script>
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default {
  props: ['size', 'value', 'uuid', 'cascadeThis', 'config', 'page'],
  data() {
    return {
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
    'config.directory'() {
      this.update()
    },
    'config.parameters'() {
      this.update()
    },
    'value'() {
      this.pull()
    }
  },
  methods: {
    is(type) {
      return this.config.type === type
    },
    update() {
      this.pull()
      this.$store.dispatch('updateSelect', {
        parameters: this.config.parameters,
        directoryID: this.config.directory,
        uniqueID: this.uuid
      })
    },
    pull() {
      this.model = typeof this.value === 'object' ? this.value.id : this.value
    },
    push() {
      this.$emit('update:value', this.model) // FIXME: This is too simple

      if(this.config.cascadeUpdate) {
        let uploadObj = {
          fromID: this.uuid
        }
        if(this.model) {
          uploadObj.value = this.model
        }
        this.$emit('update:cascadeThis', uploadObj)
      }
    }
  }
}
</script>
