import * as types from '../mutation-types'
import * as api from '@/util/api'

const state = {
  rows: [],
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
  }
}

const mutations = {
  [types.UPDATE_LIST] (state, data) {
    state.rows = data.rows
    state.paging.pageSize = data.paging ? data.paging.pageSize : 0
    state.totalRowCount = data.totalRowCount
  },
  [types.UPDATE_LIST_NO_PAGING] (state, data) {
    state.rows = data.rows
    state.totalRowCount = data.totalRowCount
  },
  [types.FETCH_FAIL] (state, error) {
    console.log(error)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
