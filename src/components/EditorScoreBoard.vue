<template>
<div class="editor-score-board">
  <el-table :data="rows">
    <el-table-column prop="version_no" label="提案"></el-table-column>
    <el-table-column v-for="(column, index) in columns" prop="feature" :label="column && column.feature" key="id">
      <template scope="scope">
        <el-input-number size="small" v-model="scope.row.score_per_act_feature[index].score"></el-input-number>
        <div>{{scope.row.score_per_act_feature[index].short_content}}</div>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<script>
import * as api from '@/util/api'

export default {
  props: ['config', 'scores', 'columnIds', 'rowIds'],
  data() {
    return {
      rows: [],
      columns: [],
      candidateRows: [],
      candidateColumns: [],
      bills: [],
      isInitial: false
    }
  },
  beforeMount () {
    api.getDirectory({ directoryID: this.config.column_directory })
    .then(response => {
      this.candidateColumns = response.data.rows
      return api.getDirectory({ directoryID: this.config.row_directory })
    }).then(response => {
      this.candidateRows = response.data.rows
      this.initiateTableColumn()
      this.isInitial = true
      this.updateRowDiff()
    })
  },
  watch: {
    'columnIds' () {
      this.updateColumnDiff()
    },
    'rowIds' () {
      if(this.isInitial) {
        this.updateRowDiff()
      }
    }
  },
  methods: {
    queryRs_bill (newObj) {
      api.getItem({ api: '/console/lab/rs_bills', id: newObj.id })
      .then(response => {
        var curBill = response.data
        this.bills.push(curBill)
        this.rows.push({
          bill_id: newObj.id,
          version_no: newObj.version_no,
          score_per_act_feature: this.columns.map(col => {
            var curActFeature = curBill.act_features.find(af => {
              return af.act_feature_id === col.id
            })
            return {
              score: 0,
              act_feature_id: col.id,
              short_content: curActFeature ? curActFeature.short_content : ''
            }
          })
        })
      })
    },
    // 增加、減少 act feature 時，score board 並不會知道哪個 element 增加、減少
    // 所以在每次 watch 到 columnIds 有變動時，靠這邊來做 Diff 來知道是增加、減少
    updateColumnDiff () {
      if (this.columns.length > this.columnIds.length) {
        var removeIndex = this.columns.findIndex(col => {
          return !this.columnIds.find(colId => {
            return colId === col.id
          })
        })
        this.columns.splice(removeIndex, 1)
        this.rows.forEach(row => {
          row.score_per_act_feature.splice(removeIndex, 1)
        })
      } else if (this.columns.length < this.columnIds.length) {
        var newIndex = this.columnIds.findIndex(colId => {
          return !this.columns.find(col => {
            return col.id === colId
          })
        })
        var newObj = this.candidateColumns.find(col => {
          return col.id === this.columnIds[newIndex]
        })
        this.columns.splice(newIndex, 0, newObj)
        this.rows.forEach(row => {
          // 要為每個新增的 column 補上相對應的 bill->act_feature->short_content
          // 在新增 rows 已經有把相對應該 bill 放在 this.bills，到裡面找
          var curActFeature = this.bills.find(bill => {
            return bill.id === row.bill_id
          }).act_features.find(af => {
            return af.act_feature_id === newObj.id
          })
          row.score_per_act_feature.splice(newIndex, 0, {
            score: 0,
            act_feature_id: newObj.id,
            short_content: curActFeature ? curActFeature.short_content : ''
          })
        })
      }
      this.$emit('update:scores', this.rows)
    },
    // 增加、減少 bill 時，score board 並不會知道哪個 element 增加、減少
    // 所以在每次 watch 到 rowIds 有變動時，靠這邊來做 Diff 來知道是增加、減少
    updateRowDiff () {
      if (this.candidateRows.length === 0) return
      for(let i = 0; i < this.rows.length; i++) {
        for(let j = 0; j < this.rowIds.length; j++) {
          if(this.rows[i].bill_id === this.rowIds[j]) {
            break
          }
          if(j === this.rowIds.length - 1) {
            this.rows.splice(i, 1)
            i--
          }
        }
      }
      let currentIds = []
      for(let i = 0; i < this.rows.length; i++) {
        currentIds.push(this.rows[i].bill_id)
      }
      for(let i = 0; i < this.rowIds.length; i++) {
        if(currentIds.indexOf(this.rowIds[i]) === -1) {
          let newObj = this.candidateRows.find(row => {
            return row.id === this.rowIds[i]
          })
          this.queryRs_bill(newObj)
        }
      }
      this.$emit('update:scores', this.rows)
    },
    initiateTableColumn () {
      if (!this.columnIds) {
        return
      }
      this.columns = this.candidateColumns.filter(col => {
        return this.columnIds.indexOf(col.id) !== -1
      })
    }
  }
}
</script>
<style lang="scss">
.editor-score-board {
  position: relative;
  > .add {
    position: absolute;
    right: 0;
    margin-top: -1rem;
    transform: translateY(-100%);
  }
}
</style>
