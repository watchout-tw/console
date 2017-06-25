<template>
<div class="editor-table">
  <el-button @click="addRow">新增{{ title }}</el-button>
  <el-table :data="rows">
    <el-table-column v-for="column in columns" :key="column.prop" :prop="column.prop" :label="column.label">
      <template scope="scope">
        <el-input-number v-if="column.type == 'number'" size="small" v-model="scope.row[column.prop]" :min="1"></el-input-number>
        <el-date-picker v-else-if="column.type == 'date'" size="small" v-model="scope.row[column.prop]"></el-date-picker>
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="96">
      <template scope="scope">
        <el-button type="text" size="small" icon="edit"></el-button>
        <el-button type="text" size="small" icon="delete2"></el-button>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<script>
export default {
  props: ['title', 'columns'],
  data() {
    return {
      rows: [
        {
          session_index: 1,
          temp_session_index: 1,
          start_date: '2016-01-01',
          end_date: '2016-02-01'
        }
      ]
    }
  },
  methods: {
    addRow() {
      this.rows.push(
        Object.assign(
          ...this.columns.map(column => ({[column.prop]: undefined}))
        )
      )
    }
  }
}
</script>
