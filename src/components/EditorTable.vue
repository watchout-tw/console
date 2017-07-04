<template>
<div class="editor-table">
  <el-button class="add" @click="addRow">新增{{ config.name }}</el-button>
  <el-table :data="rows">
    <el-table-column v-for="column in config.columns" :key="column.prop" :prop="column.prop" :label="column.label">
      <template scope="scope">
        <el-input v-if="columnIs(column, 'text')" :size="componentSize" v-model="scope.row[column.prop]"></el-input>
        <el-input-number v-if="columnIs(column, 'number')" :size="componentSize" v-model="scope.row[column.prop]"></el-input-number>
        <el-date-picker v-if="columnIs(column, 'date')" :size="componentSize" v-model="scope.row[column.prop]"></el-date-picker>
        <el-checkbox v-if="columnIs(column, 'checkbox')" :size="componentSize" v-model="scope.row[column.prop]"></el-checkbox>
        <abstract-select v-if="columnIs(column, 'select')" :size="componentSize" :value.sync="scope.row[column.prop]" :config="column" :page="page"></abstract-select>
      </template>
    </el-table-column>
    <el-table-column width="48">
      <template scope="scope">
        <el-button type="text" size="small" icon="delete2"></el-button>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<script>
import AbstractSelect from '@/components/AbstractSelect'

export default {
  props: ['rows', 'config', 'page'],
  data() {
    return {
      componentSize: 'small'
    }
  },
  methods: {
    columnIs(column, type) {
      return column.type === type
    },
    addRow() {
      this.rows.push(
        Object.assign(
          ...this.config.columns.map(column => ({[column.prop]: undefined}))
        )
      )
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
