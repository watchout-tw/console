<template>
<div class="abstract-select">
  <el-select :size="size" :placeholder="config.label" v-model="model" @change="push" clearable @clear="onClear" filterable :disabled="config.disabled">
    <template v-if="isGrouped">
      <el-option-group v-for="group in groups" :key="group.label" :label="group.label">
        <el-option v-for="option in group.options" :label="option.label" :value="option.value" :key="optionUID()"></el-option>
      </el-option-group>
    </template>
    <template v-else>
      <el-option v-for="option in options" :label="option.label" :value="option.value" :key="optionUID()"></el-option>
    </template>
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
    },
    groupLabels() {
      if(this.options) {
        return [...new Set(this.options.filter(option => option.hasOwnProperty('group')).map(option => option.group))]
      }
    },
    isGrouped() {
      if(this.groupLabels) {
        return this.groupLabels.length > 0
      }
    },
    groups() {
      if(this.options) {
        return this.groupLabels.map(groupLabel => ({
          label: groupLabel,
          options: this.options.filter(option => option.group === groupLabel)
        }))
      }
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
      if(this.config.cascadeUpdate) {
        this.triggerCascade(this.uuid, this.config.id, this.config.cascadeUpdate, this.model)
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
