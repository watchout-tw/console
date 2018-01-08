<template>
<div class="abstract-multi-select">
  <el-select :size="size" :placeholder="config.label" v-model="model" @change="push" clearable filterable multiple :allow-create="isCreative" :disabled="config.disabled && this.disabled">
    <el-option v-for="option in options" :label="option.label" :value="option.value" :key="option.value"></el-option>
  </el-select>
</div>
</template>

<script>
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
      model: []
    }
  },
  computed: {
    isCreative(type) {
      return this.config.type.indexOf('creative') > -1
    },
    options() {
      return this.$store.state[this.uuid] || []
    },
    ...mapGetters({
      cascadeQue: 'cascadeQue'
    })
  },
  beforeMount() {
    this.update()
  },
  watch: {
    '$route'() {
      this.update()
    },
    'directory'() {
      this.update()
    },
    'value'(now, then) {
      this.pull()
    },
    'cascadeQue'() {
      for(let cascade of this.cascadeQue) {
        if(cascade.targetSection !== this.sectionId) continue
        for(let id of cascade.column) {
          if(id !== this.config.id) continue
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
          } else {
            this.config.disabled = true
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
