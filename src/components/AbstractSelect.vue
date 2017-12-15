<template>
<div class="abstract-select">
  <el-select :size="size" :placeholder="config.label" v-model="model" @change="push" clearable @clear="onClear" filterable :disabled="config.disabled && this.disabled">
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
import Vuex, { mapGetters } from 'vuex'
import cascadeSource from '@/interfaces/cascadeSource'
import editors from '@/config/editors'

Vue.use(Vuex)

export default {
  mixins: [cascadeSource],
  props: ['size', 'value', 'config', 'page', 'sectionId', 'disabled'],
  data() {
    return {
      initialized: false,
      model: undefined
    }
  },
  computed: {
    options() {
      return this.$store.state[this.uuid] || []
    },
    optionSize() {
      if(this.options && this.options.length > 0) {
        let temp = 0
        for(let op of this.options) {
          temp = temp > op.label.length ? temp : op.label.length
        }
        return (2 * temp).toString() // 2 times to fix fullwidth forms
      } else {
        return '20'
      }
    },
    groupLabels() {
      return [...new Set(this.options.filter(option => option.hasOwnProperty('group')).map(option => option.group))]
    },
    isGrouped() {
      return this.groupLabels.length > 0
    },
    groups() {
      return this.groupLabels.map(groupLabel => ({
        label: groupLabel,
        options: this.options.filter(option => option.group === groupLabel)
      }))
    },
    ...mapGetters({
      cascadeQue: 'cascadeQue'
    })
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
    },
    'disabled'() {
      if(this.disabled) {
        this.model = undefined
      }
    },
    'cascadeQue'() {
      for(let cascade of this.cascadeQue) {
        if(cascade.targetSection === this.sectionId) {
          for(let id of cascade.column) {
            if(id === this.config.id) {
              if(cascade.value || cascade.value === 0) {
                let cascadeInfo = {
                  uniqueID: this.uuid,
                  api: editors[cascade.directory].api,
                  id: cascade.value,
                  keyName: this.config.cascadeAction.keyName,
                  labelName: this.config.cascadeAction.labelName,
                  valueName: this.config.cascadeAction.valueName
                }
                this.$store.dispatch('updateSelectCrossSection', cascadeInfo)
                this.config.disabled = false
              }else {
                this.config.disabled = true
              }
              this.model = undefined
            }
          }
        }
      }
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
      if(this.config.cascadeCrossSection) {
        for(let key in this.config.cascadeCrossSection) {
          let cascadeInfo = {
            targetSection: key,
            column: this.config.cascadeCrossSection[key],
            source: this.config.id,
            directory: this.config.directory,
            value: this.model
          }
          this.$store.dispatch('updateCascade', cascadeInfo)
        }
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
