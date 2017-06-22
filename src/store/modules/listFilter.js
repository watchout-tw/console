import * as types from '../mutation-types'
import * as api from '../../util/api'

const state = {
  nameOptions: [],
  partyOptions: [],
  districtOptions: []
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
    } else if (filterID === 'districts') {
      return state.districtOptions
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
    api.getSelectedFilterList(reqObj).then(response => {
      var options = response.data.rows.map(row => ({
        value: row.name,
        label: row.name
      }))
      commit(types.UPDATE_PARTY_FILTER, options)
    }).catch(error => {
      commit(types.FETCH_FAIL, error)
    })
  },
  updateDistrictFilter ({ commit }, reqObj) {
    api.getSelectedFilterList(reqObj).then(response => {
      var options = response.data.rows.map(row => ({
        value: row.name,
        label: row.name
      }))
      commit(types.UPDATE_DISTRICT_FILTER, options)
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
    console.log('selectedFilter', data)
    state.partyOptions = data
  },
  [types.UPDATE_DISTRICT_FILTER] (state, data) {
    console.log('selectedFilter', data)
    state.districtOptions = data
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
