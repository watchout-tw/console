<template>
<div class="editor-table">
  <el-button class="add" @click="addRow">新增{{ title }}</el-button>
  <el-table :data="rows">
    <el-table-column v-for="column in columns" :key="column.prop" :prop="column.prop" :label="column.label">
      <template scope="scope">
        <el-input-number v-if="columnIs(column, 'number')" size="small" v-model="scope.row[column.prop]"></el-input-number>
        <el-date-picker v-else-if="columnIs(column, 'date')" size="small" v-model="scope.row[column.prop]"></el-date-picker>
      </template>
    </el-table-column>
    <el-table-column fixed="right" width="48">
      <template scope="scope">
        <el-button type="text" size="small" icon="delete2"></el-button>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<script>
export default {
  props: ['title', 'columns', 'rows'],
  methods: {
    columnIs(column, type) {
      return column.type === type
    },
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

<style lang="scss">
.editor-table {
  position: relative;
  > .add {
    position: absolute;
    right: 0;
    margin-top: -1rem;
    transform: translateY(-100%);
  }
}

</style>
