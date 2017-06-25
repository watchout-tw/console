import * as types from '../mutation-types'
import * as api from '../../util/api'
import editorChecklists from '../../config/editorChecklists'

// Compose checklistOptions = { xxx: xxxOptions, yyy: yyyOptions}
var checklistOptions = {}
for (let checklist in editorChecklists) {
  var checklistID = editorChecklists[checklist].id
  checklistOptions[checklistID] = checklistID + '_options'
}

// Compose state = { xxxOptions: [], yyyOptions: [] }
var stateBuilder = {}
for (let options in checklistOptions) {
  stateBuilder[checklistOptions[options]] = []
}
const state = stateBuilder

const getters = {
  checklistOptions: state => (checklistID) => {
    return state[checklistID + '_options']
  }
}

const actions = {
  updateChecklist ({ commit }, reqObj) {
    api.getDirectory(reqObj).then(response => {
      var respObj = {
        data: response.data.rows.map(row => {
          let [value, label] = reqObj.directoryID === 'term'
            ? [row.index, row.index]
            : [row.name, row.name]
          return { value, label }
        }),
        checklistID: reqObj.checklistID,
        directoryID: reqObj.directoryID
      }
      commit(types.UPDATE_CHECKLIST, respObj)
    }).catch(error => {
      commit(types.FETCH_FAIL, error)
    })
  }
}

const mutations = {
  [types.UPDATE_CHECKLIST] (state, mutateObj) {
    console.log('mutation: UPDATE_CHECKLIST', mutateObj)
    state[checklistOptions[mutateObj.checklistID]] = mutateObj.data
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
