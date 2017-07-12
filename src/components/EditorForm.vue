<template>
<div class="editor-form">
  <el-form :label-width="config.options.labelWidth" label-position="left">
    <el-form-item v-for="field in config.fields" :key="field.id" :label="field.label" :style="formItemStyle(field)">
      <el-input v-if="fieldIs(field, 'text')" v-model="model[field.id]"></el-input>
      <el-input v-if="fieldIs(field, 'textarea')" type="textarea" v-model="model[field.id]"></el-input>
      <el-input-number v-if="fieldIs(field, 'number')" v-model="model[field.id]"></el-input-number>
      <el-date-picker v-if="fieldIs(field, 'date')" v-model="model[field.id]"></el-date-picker>
      <el-color-picker v-if="fieldIs(field, 'color')" v-model="model[field.id]" show-alpha></el-color-picker>
      <abstract-select v-if="fieldIs(field, 'select')" :value.sync="model[field.id]" :config="field" :page="page"></abstract-select>
      <gender-slider v-if="fieldIs(field, 'gender')" :value.sync="model[field.id]" :config="field" :page="page"></gender-slider>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
import AbstractSelect from '@/components/AbstractSelect'
import GenderSlider from '@/components/GenderSlider'

export default {
  props: ['model', 'config', 'page'],
  methods: {
    fieldIs(field, type) {
      return field.type.split('-').shift() === type
    },
    formItemStyle(field) {
      var styleObj = {}
      if(field.determined_by) {
        styleObj.marginLeft = this.config.options.labelWidth
      }
      return styleObj
    }
  },
  components: {
    AbstractSelect,
    GenderSlider
  }
}
</script>
