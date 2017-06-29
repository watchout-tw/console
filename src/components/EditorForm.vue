<template>
<div class="editor-form">
  <el-form :label-width="options.labelWidth" label-position="left">
    <el-form-item v-for="field in fields" :key="field.id" :label="field.label">
      <el-input-number v-if="fieldIs(field, 'number')" v-model="model[field.id]"></el-input-number>
      <el-date-picker v-if="fieldIs(field, 'date')" v-model="model[field.id]"></el-date-picker>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
export default {
  props: ['fields', 'options', 'model'],
  methods: {
    fieldIs(field, type) {
      return field.type === type
    }
  }
}
</script>
