import * as types from '../mutation-types'
import * as api from '@/util/api'

const state = {
  rows: [],
  filteredRows: [],
  paging: {
    page: 1,
    pageSize: 20
  },
  totalRowCount: 0
}

const getters = {
  rows: state => state.rows,
  paging: state => state.paging,
  totalRowCount: state => state.totalRowCount
}

const actions = {
  updateList ({ commit }, reqObj) {
    api.getListByNameWithPaging(reqObj).then(response => {
      commit(types.UPDATE_LIST, response.data)
    }).catch(error => {
      commit(types.FETCH_FAIL, error)
    })
  },
  updateListNoPaging ({ commit }, reqObj) {
    api.getListByNameNoPaging(reqObj).then(response => {
      commit(types.UPDATE_LIST_NO_PAGING, response.data)
    }).catch(error => {
      commit(types.FETCH_FAIL, error)
    })
  },
  filterList ({ commit }, reqObj) {
    var filteredRows = reqObj.rows
    for (var key in reqObj.queryParameters) {
      if (!reqObj.queryParameters[key]) {
        // Skipped if corresponding filter is empty
        continue
      }
      var currentFilter = reqObj.filterInfo.find(fil => {
        return fil.id === key
      })
      filteredRows = filteredRows.filter(row => {
        return currentFilter.comparator(row[currentFilter.mapToColumn], reqObj.queryParameters[key])
      })
    }
    var data = {
      rows: filteredRows
    }
    commit(types.FILTER_LIST, data)
  },
  getFilteredList ({ commit }, reqObj) {
    api.getListByFilter(reqObj).then(response => {
      commit(types.GET_FILTERED_LIST, response.data)
    }).catch(error => {
      commit(types.FETCH_FAIL, error)
    })
  }
}

const mutations = {
  [types.UPDATE_LIST] (state, data) {
    state.rows = data.rows
    state.filteredRows = data.rows
    state.paging.pageSize = data.paging ? data.paging.pageSize : 0
    state.totalRowCount = data.totalRowCount
  },
  [types.UPDATE_LIST_NO_PAGING] (state, data) {
    state.rows = data.rows
    state.filteredRows = data.rows
    state.totalRowCount = data.totalRowCount
  },
  [types.FILTER_LIST] (state, data) {
    state.filteredRows = data.rows
  },
  [types.GET_FILTERED_LIST] (state, data) {
    state.filteredRows = data.rows
  },
  [types.FETCH_FAIL] (state, error) {
    console.error('Status Code', error.response.status)
    console.error('Messages', error.response.data)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
