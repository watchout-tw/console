<template>
<div class="editor-form">
  <el-form :label-width="config.options.labelWidth" label-position="left">
    <el-form-item v-for="field in config.fields" :key="field.id" :label="field.label" :class="formItemClasses(field)">
      <el-input v-if="fieldIs(field, 'text')" v-model="model[field.id]"></el-input>
      <el-input v-if="fieldIs(field, 'textarea')" type="textarea" v-model="model[field.id]"></el-input>
      <el-input-number v-if="fieldIs(field, 'number')" v-model="model[field.id]"></el-input-number>
      <el-date-picker v-if="fieldIs(field, 'date')" v-model="model[field.id]"></el-date-picker>
      <el-switch v-if="fieldIs(field, 'switch')" v-model="model[field.id]" on-text="YES" off-text="NO"></el-switch>
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
    formItemClasses(field) {
      var classes = []
      if(field.determined_by) {
        classes.push('has-dependency')
      }
      return classes
    }
  },
  components: {
    AbstractSelect,
    GenderSlider
  }
}
</script>

<style lang="scss">
.editor-form {
  .el-form-item.has-dependency {
    position: relative;

    &:before {
      $font-size: 1rem;
      content: '↳';
      display: block;
      position: absolute;
      top: -$font-size/2;
      left: 0;
      font-size: $font-size;
      line-height: 1;
      height: $font-size;
      opacity: 0.5;
    }
  }
}
</style>
