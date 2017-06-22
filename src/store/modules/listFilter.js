import * as types from '../mutation-types'
import * as api from '../../util/api'
import filterConfig from '../../components/filters'

// Compose filterOptions = { xxx: xxxOptions, yyy: yyyOptions}
var filterOptions = {}
for (var filter in filterConfig) {
  filterOptions[filter] = filter + 'Options'
}

// Compose state = { xxxOptions: [], yyyOptions: [] }
var stateBuilder = {}
for (var options in filterOptions) {
  stateBuilder[filterOptions[options]] = []
}
const state = stateBuilder

const getters = {
  options: state => (filterID) => {
    return state[filterID + 'Options']
  }
}

const actions = {
  updateNameFilter ({ commit }, reqObj) {
    api.getListByName(reqObj).then(response => {
      var respObj = {
        data: response.data.rows.map(row => ({
          value: row.name
        })),
        filterID: reqObj.filterID
      }
      commit(types.UPDATE_SELECTED_FILTER, respObj)
    }).catch(error => {
      commit(types.FETCH_FAIL, error)
    })
  },
  updateSelectedFilter ({ commit }, reqObj) {
    api.getSelectedFilterList(reqObj).then(response => {
      var respObj = {
        data: response.data.rows.map(row => ({
          value: row.name,
          label: row.name
        })),
        filterID: reqObj.filterID
      }
      commit(types.UPDATE_SELECTED_FILTER, respObj)
    }).catch(error => {
      commit(types.FETCH_FAIL, error)
    })
  }
}

const mutations = {
  [types.UPDATE_SELECTED_FILTER] (state, mutateObj) {
    console.log('name', mutateObj)
    state[filterOptions[mutateObj.filterID]] = mutateObj.data
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
