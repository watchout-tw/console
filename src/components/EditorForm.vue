<template>
<div class="editor-form">
  <el-form>
    <el-form-item v-for="field in fields" :label="field.label">
      <el-input-number v-if="field.type == 'number'" v-model="model[field.id]" :min="1"></el-input-number>
      <el-date-picker v-else-if="field.type == 'date'" v-model="model[field.id]"></el-date-picker>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
export default {
  props: ['fields'],
  data() {
    return {
      model: {} // create empty data model
    }
  },
  created() {
    // create data model for each field
    this.fields.forEach(field => {
      this.$set(this.model, field.id, undefined)
    })
  }
}
</script>
