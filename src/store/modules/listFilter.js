import * as types from '../mutation-types'
import * as api from '../../util/api'
import listFilters from '../../config/listFilters'

// Compose filterOptions = { xxx: xxxOptions, yyy: yyyOptions}
var filterOptions = {}
for (let filter in listFilters) {
  var filterID = listFilters[filter].id
  filterOptions[filterID] = filterID + '_options'
}

// Compose state = { xxxOptions: [], yyyOptions: [] }
var stateBuilder = {}
for (let options in filterOptions) {
  stateBuilder[filterOptions[options]] = []
}
const state = stateBuilder

const getters = {
  filterOptions: state => (filterID) => {
    return state[filterID + '_options']
  }
}

const actions = {
  updateFilter ({ commit }, reqObj) {
    api.getDirectory(reqObj).then(response => {
      var respObj = {
        data: response.data.rows.map(row => {
          let [value, label] = reqObj.directoryID === 'term'
            ? [row.index, row.index]
            : [row.name, row.name]
          return { value, label }
        }),
        filterID: reqObj.filterID,
        directoryID: reqObj.directoryID
      }
      commit(types.UPDATE_FILTER, respObj)
    }).catch(error => {
      commit(types.FETCH_FAIL, error)
    })
  }
}

const mutations = {
  [types.UPDATE_FILTER] (state, mutateObj) {
    console.log('mutation: UPDATE_FILTER', mutateObj)
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
