<template>
<div class="editor-form">
  <el-form>
    <el-form-item v-for="field in fields" :key="field.id" :label="field.label">
      <el-input-number v-if="field.type == 'number'" v-model="model[field.id]"></el-input-number>
      <el-date-picker v-else-if="field.type == 'date'" v-model="model[field.id]"></el-date-picker>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
export default {
  props: ['fields', 'model']
}
</script>
