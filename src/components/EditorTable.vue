<template>
<div class="editor-table">
  <el-button class="add" @click="addRow">新增{{ config.name }}</el-button>
  <el-table :data="rows">
    <el-table-column v-for="column in config.columns" v-if="!column.hide" :key="column.prop" :prop="column.prop" :label="column.label">
      <template scope="scope">
        <template v-if="flags[scope.$index].isEditing && (flags[scope.$index].isLocal || !column.updateForbidden)">
          <el-input v-if="columnIs(column, 'text')" :size="componentSize" v-model="scope.row[column.prop]"></el-input>
          <el-input-number v-if="columnIs(column, 'number')" :size="componentSize" v-model="scope.row[column.prop]" ></el-input-number>
          <el-date-picker v-if="columnIs(column, 'date')" :size="componentSize" v-model="scope.row[column.prop]"></el-date-picker>
          <el-switch v-if="columnIs(column, 'switch')" :size="componentSize" v-model="scope.row[column.prop]" on-text="YES" off-text="NO"></el-switch>
          <el-checkbox v-if="columnIs(column, 'checkbox')" :size="componentSize" v-model="scope.row[column.prop]"></el-checkbox>
          <abstract-select v-if="columnIs(column, 'select')" :size="componentSize" :value.sync="scope.row[column.prop]" :uuid="uuids[scope.$index][column.prop]" :config="column" :page="page"></abstract-select>
          <abstract-multi-select v-if="columnIs(column, 'multiselect')" :size="componentSize" :value.sync="scope.row[column.prop]" :uuid="uuids[scope.$index][column.prop]" :config="column" :page="page"></abstract-multi-select>
        </template>
        <template v-else>
          <div class="formatted-content" v-html="cellFormatter(column, scope)"></div>
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
import Vue from 'vue'
import Vuex from 'vuex'
import uuid from 'uuid/v4'
import AbstractSelect from '@/components/AbstractSelect'
import AbstractMultiSelect from '@/components/AbstractMultiSelect'

Vue.use(Vuex)

const punct = {
  separator: '、',
  colon: '：'
}
function directoryValueToLabel(directory, val) {
  if(typeof val === 'object') { // replace val if is object
    val = val.id // FIXME: this assumes key prop of all obj are `id`
  }
  let directoryItem = directory.filter(item => item.value === val).pop()
  return directoryItem ? directoryItem.label : val
}

export default {
  props: ['rows', 'config', 'page', 'parentInitialized'],
  data() {
    return {
      initialized: false,
      componentSize: 'small',
      flags: [],
      uuids: []
    }
  },
  beforeMount() {
    this.init()
  },
  watch: {
    'parentInitialized'() {
      if(!this.initialized && this.rows) {
        this.flags = this.rows.map(row => ({
          isEditing: false
        }))
        this.uuids = this.rows.map(row => this.generateUUIDForRow())
        this.initialized = true
      }
    }
  },
  methods: {
    init() {
      this.config.columns
        .filter(column => !!column.directory)
        .forEach(column => {
          this.$store.dispatch('cacheDirectory', {
            directoryID: column.directory
          })
        })
    },
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
      var tableRows = this.rows ? this.rows : []
      tableRows.splice($index, 1)
      this.$emit('update:rows', tableRows)
    },
    addRow() {
      var tableRows = this.rows ? this.rows : []
      tableRows.push(this.generateModelForRow())
      this.flags.push({
        isEditing: true,
        isLocal: true
      })
      this.uuids.push(this.generateUUIDForRow())
      this.$emit('update:rows', tableRows)
    },
    generateModelForRow() {
      var newRow = Object.assign(
        ...this.config.columns.map(column => ({[column.prop]: undefined}))
      )
      if(this.config.prepareIndex) {
        newRow[this.config.prepareIndex] = this.getIndex(this.rows, this.config.prepareIndex)
      }
      return newRow
    },
    getIndex(data, columnName) {
      if(!data) {
        return 1
      }
      var temp = 0
      for(let item of data) {
        if(item[columnName] && item[columnName] >= temp) {
          temp = item[columnName]
        }
      }
      return temp + 1
    },
    generateUUIDForRow() {
      return Object.assign(
        ...this.config.columns.map(column => ({[column.prop]: uuid()}))
      )
    },
    cellFormatter(column, scope) {
      let val = scope.row[scope.column.property]
      let result = val
      let cachedDirectory = column.directory ? this.$store.state.directory[column.directory] : undefined
      if(val === null) {
        result = `<span class="null">${val}</span>`
      } else if(cachedDirectory) {
        if(val instanceof Array) {
          result = val.map(item => directoryValueToLabel(cachedDirectory, item)).join(punct.separator)
        } else {
          result = directoryValueToLabel(cachedDirectory, val)
        }
      } else if(column.formatter) {
        result = column.formatter(scope.row, scope.column)
      }
      return result
    },
    rowIsLocal(row) {
      return row.local
    }
  },
  components: {
    AbstractSelect,
    AbstractMultiSelect
  }
}
</script>

<style lang="scss">
.cell > .formatted-content {
  .null {
    text-transform: uppercase;
    font-size: 0.75rem;
    opacity: 0.5;
  }
}
.editor-table {
  position: relative;
  > .add {
    position: absolute;
    right: 0;
    margin-top: -1rem;
    transform: translateY(-100%);
  }
}

.cell > .formatted-content .yes {
  text-transform: uppercase;
  font-size: 0.75rem;
  font-weight: bold;
}

</style>
