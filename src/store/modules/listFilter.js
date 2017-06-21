import * as types from '../mutation-types'
import * as api from '../../util/api'

const state = {
  nameOptions: [],
  partyOptions: []
}

const getters = {
  /* This is a workaround of modularized component with vuex
     By making getter return a function with parameter
     We are able to share the same state with different listFilters
  */
  options: state => (filterID) => {
    if (filterID === 'name') {
      return state.nameOptions
    } else if (filterID === 'parties') {
      return state.partyOptions
    }
  }
}

const actions = {
  updateNameFilter ({ commit }, reqObj) {
    api.getListByName(reqObj).then(response => {
      var options = response.data.rows.map(row => ({
        value: row.name
      }))
      commit(types.UPDATE_NAME_FILTER, options)
    }).catch(error => {
      commit(types.FETCH_FAIL, error)
    })
  },
  updatePartyFilter ({ commit }, reqObj) {
    api.getPartyList(reqObj).then(response => {
      var options = response.data.rows.map(row => ({
        value: row.name,
        label: row.name
      }))
      commit(types.UPDATE_PARTY_FILTER, options)
    }).catch(error => {
      commit(types.FETCH_FAIL, error)
    })
  }
}

const mutations = {
  [types.UPDATE_NAME_FILTER] (state, data) {
    console.log('name', data)
    state.nameOptions = data
  },
  [types.UPDATE_PARTY_FILTER] (state, data) {
    console.log('party', data)
    state.partyOptions = data
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
