<template>
<div class="editor-table">
  <el-button type="primary">Add row</el-button>
  <el-table :data="rows">
    <el-table-column v-for="column in columns" :prop="column.prop" :label="column.label">
      <template scope="scope">
        <el-input-number v-if="column.type == 'number'" :min="1"></el-input-number>
        <el-date-picker v-else-if="column.type == 'date'"></el-date-picker>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<script>
export default {
  props: ['columns'],
  data() {
    return {
      rows: [
        {
          session_index: 8,
          temp_session_index: 1,
          start_date: '2016-01-01',
          end_date: '2016-02-01'
        }
      ]
    }
  }
}
</script>
