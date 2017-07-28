<template>
<div class="term-lookup">
  <el-date-picker :placeholder="config.label" v-model="model" @change="push"></el-date-picker>
</div>
</template>

<script>
import * as api from '@/util/api'

export default {
  props: ['value', 'uuid', 'cascadeThis', 'config', 'page'],
  data() {
    return {
      model: undefined
    }
  },
  watch: {
    'value'() {
      this.pull()
    }
  },
  methods: {
    pull() {
      this.model = this.value
    },
    push() {
      this.$emit('update:value', this.model)

      if(this.config.cascadeUpdate) {
        let uploadObj = {
          fromID: this.uuid
        }
        if(this.model.constructor.name === 'Date') {
          let timestamp = this.model.getTime()
          api.lookupTerm({
            timestamp
          }).then(response => {
            if(response.data.term_index) {
              uploadObj.value = response.data
            } else {
              this.$message({
                message: this.model.toLocaleDateString() + '是休會期間',
                type: 'error'
              })
              this.model = undefined
            }
            this.$emit('update:cascadeThis', uploadObj)
          })
        } else {
          this.$emit('update:cascadeThis', uploadObj)
        }
      }
    }
  }
}
</script>
