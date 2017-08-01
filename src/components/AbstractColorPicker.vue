<template>
<div class="abstract-color-picker d-flex flex-row">
  <el-color-picker v-model="model" @change="rgbToHex" show-alpha></el-color-picker>
  <el-input v-model="model" placeholder="#000000" @change="push"></el-input>
</div>
</template>

<script>
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const getHexCode = function(rgb) {
  let hex = '#'
  for(let i = 0; i < 3; i++) {
    hex += ('0' + parseInt(rgb[i], 10).toString(16)).slice(-2).toUpperCase()
  }
  return hex
}

export default {
  props: ['value'],
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
    rgbToHex() {
      const rgbaReg = /^rgba\(\s*(0|[1-9]\d?|1\d\d?|2[0-4]\d|25[0-5])\s*,\s*(0|[1-9]\d?|1\d\d?|2[0-4]\d|25[0-5])\s*,\s*(0|[1-9]\d?|1\d\d?|2[0-4]\d|25[0-5])\s*,\s*((0.[1-9])|[01])\s*\)$/
      const rgbReg = /^rgb\(\s*(0|[1-9]\d?|1\d\d?|2[0-4]\d|25[0-5])\s*,\s*(0|[1-9]\d?|1\d\d?|2[0-4]\d|25[0-5])\s*,\s*(0|[1-9]\d?|1\d\d?|2[0-4]\d|25[0-5])\s*\)$/
      if(rgbaReg.test(this.model) || rgbReg.test(this.model)) {
        let rgba = this.model.split('(')[1].split(')')[0].split(',')
        this.model = getHexCode(rgba)
        this.push()
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

<style  lang="scss">
.abstract-color-picker {
  width: 100%;

  .el-color-picker {
    margin-right: 0.5rem;
  }
  .el-input {
    max-width: 10rem;
    margin-right: 0.5rem;
  }
}
</style>
