<template>
<div class="editor-form">
  <el-form :label-width="options.labelWidth" label-position="left">
    <el-form-item v-for="(field, index) in fields" :key="field.id" :label="field.label">
      <el-input-number v-if="fieldIs(index, 'number')" v-model="model[field.id]"></el-input-number>
      <el-date-picker v-if="fieldIs(index, 'date')" v-model="model[field.id]"></el-date-picker>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
export default {
  props: ['fields', 'options', 'model'],
  methods: {
    fieldIs(index, type) {
      return this.fields[index].type === type
    }
  }
}
</script>
