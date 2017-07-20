<template>
<div class="editor-checklist">
  <el-checkbox-group v-model="tmp" @change="handleChange">
    <el-checkbox-button v-for="item in options" :label="item.value" :key="item.value">{{ item.label }}</el-checkbox-button>
  </el-checkbox-group>
</div>
</template>

<script>
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default {
  props: ['model', 'config', 'page'],
  data() {
    return {
      initialized: false,
      tmp: []
    }
  },
  computed: {
    options() {
      return this.$store.state.editorChecklist[this.config.uniqueID]
    }
  },
  beforeMount() {
    this.update()
  },
  watch: {
    'page.id'() {
      this.update()
    },
    'model'() {
      if(!this.initialized) {
        for(let item of this.model) {
          this.tmp.push(item.id)
        }
        this.initialized = true
      }
    }
  },
  methods: {
    update() {
      this.$store.dispatch('updateChecklist', {
        directoryID: this.config.directory,
        uniqueID: this.config.uniqueID
      })
      this.initialized = false
    },
    handleChange(now) {
      this.$emit('update:model', now.map(item => ({id: item})))
    }
  }
}
</script>

<style lang="scss">
.el-checkbox + .el-checkbox {
  margin-left: 0;
}
.el-checkbox {
  margin-right: 1rem;
}
</style>
