<template>
<div class="editor-form">
  <el-form :label-width="config.options.labelWidth" label-position="left">
    <el-form-item v-for="field in config.fields" :key="field.id" :label="field.label">
      <el-input v-if="fieldIs(field, 'text')" v-model="model[field.id]"></el-input>
      <el-input v-if="fieldIs(field, 'textarea')" type="textarea" v-model="model[field.id]"></el-input>
      <el-input-number v-if="fieldIs(field, 'number')" v-model="model[field.id]"></el-input-number>
      <el-date-picker v-if="fieldIs(field, 'date')" v-model="model[field.id]"></el-date-picker>
      <el-color-picker v-if="fieldIs(field, 'color')" v-model="model[field.id]" show-alpha></el-color-picker>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
export default {
  props: ['config', 'model'],
  methods: {
    fieldIs(field, type) {
      return field.type === type
    }
  }
}
</script>
