<template>
<div class="editor-table">
  <el-button class="add" @click="addRow">新增{{ config.name }}</el-button>
  <el-table :data="rows">
    <el-table-column v-for="column in config.columns" v-if="!column.hide" :key="column.prop" :prop="column.prop" :label="column.label" :class-name="column.required ? 'mandatory' : ''">
      <template scope="scope">
        <template v-if="flags[scope.$index].isEditing && (flags[scope.$index].isLocal || !column.updateForbidden)">
          <el-input v-if="columnIs(column, 'text')" :size="componentSize" v-model="scope.row[column.prop]"></el-input>
          <el-input v-if="columnIs(column, 'textarea')" type="textarea" :size="componentSize" v-model="scope.row[column.prop]"></el-input>
          <el-input-number v-if="columnIs(column, 'number')" :size="componentSize" v-model="scope.row[column.prop]" ></el-input-number>
          <el-switch v-if="columnIs(column, 'switch')" :size="componentSize" v-model="scope.row[column.prop]" on-text="YES" off-text="NO"></el-switch>
          <el-checkbox v-if="columnIs(column, 'checkbox')" :size="componentSize" v-model="scope.row[column.prop]"></el-checkbox>
          <term-lookup v-if="columnIs(column, 'date')" :size="componentSize" :value.sync="scope.row[column.prop]" :cascadeConfig="cascadeMap[scope.$index][column.prop]" :queueCascadeUpdate="queueCascadeUpdate" :config="column" :page="page"></term-lookup>
          <abstract-select v-if="columnIs(column, 'select')" :size="componentSize" :value.sync="scope.row[column.prop]" :disabled="!scope.row[column.dependency]" :cascadeConfig="cascadeMap[scope.$index][column.prop]" :queueCascadeUpdate="queueCascadeUpdate" :config="column" :page="page" :sectionId="sectionId"></abstract-select>
          <abstract-multi-select v-if="columnIs(column, 'multiselect')" :size="componentSize" :value.sync="scope.row[column.prop]" :cascadeConfig="cascadeMap[scope.$index][column.prop]" :config="column" :page="page"></abstract-multi-select>
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
import Vuex, { mapGetters } from 'vuex'
import AbstractSelect from '@/components/AbstractSelect'
import AbstractMultiSelect from '@/components/AbstractMultiSelect'
import TermLookup from '@/components/TermLookup'
import cascadeController from '@/interfaces/cascadeController'

Vue.use(Vuex)

const punct = {
  separator: '、',
  colon: '：'
}
function directoryValueToLabel (directory, val) {
  if(typeof val === 'object') { // replace val if is object
    val = val.id // FIXME: this assumes key prop of all obj are `id`
  }
  let directoryItem = directory.filter(item => item.value === val).pop()
  return directoryItem ? directoryItem.label : val
}

export default {
  mixins: [cascadeController],
  props: ['rows', 'config', 'page', 'parentInitialized', 'sectionId'],
  data() {
    return {
      initialized: false,
      componentSize: 'small',
      flags: []
    }
  },
  computed: {
    ...mapGetters({
      cascadeQue: 'cascadeQue'
    })
  },
  beforeMount() {
    this.init()
    this.asyncInit()
  },
  watch: {
    'parentInitialized'() {
      this.asyncInit()
    }
    // 'cascadeQue'() {}
    // TODO if need, general method of cascade
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
    asyncInit() {
      if(this.parentInitialized && !this.initialized && this.rows) {
        this.makeFlags()
        this.cascadeInit(this.rows, true, this.config.columns)
        this.initialized = true
      }
    },
    columnIs(column, type) {
      return column.type.split('-').shift() === type
    },
    makeFlags() {
      this.flags = this.rows.map(row => ({
        isEditing: false
      }))
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
      this.deleteCascadeSector($index)
      this.$emit('update:rows', tableRows)
    },
    addRow() {
      var tableRows = this.rows ? this.rows : []
      tableRows.push(this.makeRow())
      this.flags.push({
        isEditing: true,
        isLocal: true
      })
      this.addCascadeSector()
      this.$emit('update:rows', tableRows)
    },
    makeRow() {
      var newRow = Object.assign(
        ...this.config.columns.map(column => ({[column.prop]: column.defaultValue ? column.defaultValue : null}))
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
    cellFormatter(column, scope) {
      let val = scope.row[scope.column.property]
      let result = val
      let cachedDirectory = column.directory ? this.$store.state.directory[column.directory] : undefined
      if (val === null) {
        result = `<span class="null">${val}</span>`
      } else if (val === undefined) {
        result = `<span class="null">${val}</span>`
      } else if (cachedDirectory) {
        if (val instanceof Array) {
          result = val.map(item => directoryValueToLabel(cachedDirectory, item)).join(punct.separator)
        } else {
          result = directoryValueToLabel(cachedDirectory, val)
        }
      } else if (column.formatter) {
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
    AbstractMultiSelect,
    TermLookup
  }
}
</script>

<style lang="scss">
.cell {
  .el-textarea {
    margin: 0.5rem 0;
  }
}
.cell > .formatted-content {
  .null {
    text-transform: uppercase;
    font-size: 0.75rem;
    opacity: 0.5;
  }
  .yes {
    text-transform: uppercase;
    font-size: 0.75rem;
    font-weight: bold;
  }

  // handle markdown
  p:last-child {
    margin-bottom: 0;
  }
  ul {
    padding-left: 1rem;
    margin-bottom: 0;
  }
}
.editor-table {
  th.mandatory > .cell:before{
    content: '*';
    color: red;
    padding: 0.3em;
  }
  position: relative;
  > .add {
    position: absolute;
    right: 0;
    margin-top: -1rem;
    transform: translateY(-100%);
  }
}

</style>
