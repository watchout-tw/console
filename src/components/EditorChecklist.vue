<template>
<div class="editor-checklist">
  <el-checkbox-group v-model="localModel" @change="handleChange">
    <el-checkbox-button v-for="item in options" :label="item.value" :key="item.value">{{ item.label }}</el-checkbox-button>
  </el-checkbox-group>
</div>
</template>

<script>
import uuid from 'uuid/v4'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default {
  props: ['model', 'config', 'page'],
  data() {
    return {
      initialized: false,
      uuid: uuid(),
      localModel: []
    }
  },
  computed: {
    options() {
      return this.$store.state.editorChecklist[this.uuid]
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
    'model'() {
      if(!this.initialized) {
        for(let item of this.model) {
          this.localModel.push(item.id)
        }
        this.initialized = true
      }
    }
  },
  methods: {
    update() {
      this.$store.dispatch('updateChecklist', {
        directoryID: this.config.directory,
        uniqueID: this.uuid
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
.editor-checklist {
  margin-top: -0.25rem;
  margin-left: -0.25rem;
}
// ElementIO override
.el-checkbox-group {
  > .el-checkbox-button {
    margin: 0.25rem;
    > .el-checkbox-button__inner {
      border: 1px solid #bfcbd9;
      border-radius: 0.25rem;
      box-shadow: none;
    }
    &.is-checked > .el-checkbox-button__inner {
      background-color: rgba(32, 160, 255, 0.1);
      border-color: rgba(32, 160, 255, 0.2);
      color: #20a0ff;
    }
  }
}
</style>
