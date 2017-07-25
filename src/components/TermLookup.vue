<template>
<div class="term-lookup">
  <el-date-picker :placeholder="config.label" v-model="tmp" @change="handleChange()"></el-date-picker>
</div>
</template>

<script>
import axios from 'axios'

export default {
  props: ['value', 'uuid', 'cascadeThis', 'config', 'page'],
  data() {
    return {
      tmp: undefined
    }
  },
  watch: {
    'value'() {
      this.syncModel()
    }
  },
  methods: {
    syncModel() {
      this.tmp = this.value
    },
    handleChange() {
      this.$emit('update:value', this.tmp)

      if(this.config.cascadeUpdate) {
        let uploadObj = {
          fromID: this.uuid
        }
        if(this.tmp.constructor.name === 'Date') {
          let timestamp = this.tmp.getTime()
          axios.get('/console/lab/date_to_term?date=' + timestamp).then(response => {
            if(response.data.object.term_index) {
              // let {term_index, session_index, temp_session_index} = response.data.object
              // console.log(term_index, session_index, temp_session_index)
              uploadObj.value = response.data.object
            } else {
              console.log('Congress is in recess on ' + this.tmp.toLocaleDateString())
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
