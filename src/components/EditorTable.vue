<template>
<div class="editor-table">
  <el-button class="add" @click="addRow">新增{{ config.name }}</el-button>
  <el-table :data="rows">
    <el-table-column v-for="column in config.columns" :key="column.prop" :prop="column.prop" :label="column.label">
      <template scope="scope">
        <template v-if="flags[scope.$index].isEditing">
          <el-input v-if="columnIs(column, 'text')" :size="componentSize" v-model="scope.row[column.prop]"></el-input>
          <el-input-number v-if="columnIs(column, 'number')" :size="componentSize" v-model="scope.row[column.prop]"></el-input-number>
          <el-date-picker v-if="columnIs(column, 'date')" :size="componentSize" v-model="scope.row[column.prop]"></el-date-picker>
          <el-checkbox v-if="columnIs(column, 'checkbox')" :size="componentSize" v-model="scope.row[column.prop]"></el-checkbox>
          <abstract-select v-if="columnIs(column, 'select')" :size="componentSize" :value.sync="scope.row[column.prop]" :config="column" :page="page"></abstract-select>
        </template>
        <template v-else>
          {{ column.formatter ? column.formatter(scope.row, scope.column) : scope.row[scope.column.property] }}
        </template>
      </template>
    </el-table-column>
    <el-table-column width="64">
      <template scope="scope">
        <el-button v-if="flags[scope.$index].isEditing" type="text" size="small" icon="check" @click="confirmRow(scope.$index)"></el-button>
        <el-button v-else type="text" size="small" icon="edit" @click="editRow(scope.$index)"></el-button>
        <el-button type="text" size="small" icon="delete2" @click="deleteRow(scope.$index)"></el-button>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<script>
import AbstractSelect from '@/components/AbstractSelect'

export default {
  props: ['rows', 'config', 'page', 'isInitialized'],
  data() {
    return {
      componentSize: 'small',
      flags: []
    }
  },
  watch: {
    'isInitialized'(now) {
      this.flags = this.rows.map(row => ({isEditing: false}))
    }
  },
  methods: {
    columnIs(column, type) {
      return column.type.split('-').shift() === type
    },
    confirmRow($index) {
      this.flags[$index].isEditing = false
    },
    editRow($index) {
      this.flags[$index].isEditing = true
    },
    deleteRow($index) {
    },
    addRow() {
      this.rows.push(
        Object.assign(
          ...this.config.columns.map(column => ({[column.prop]: undefined}))
        )
      )
      this.flags.push({
        isEditing: true
      })
    }
  },
  components: {
    AbstractSelect
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
