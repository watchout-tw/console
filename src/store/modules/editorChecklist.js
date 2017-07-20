import * as types from '../mutation-types'
import * as api from '@/util/api'
import Vue from 'vue'
import directories from '@/config/directories'

const state = {

}

const getters = {

}

const actions = {
  updateChecklist ({ commit }, reqObj) {
    api.getDirectory(reqObj).then(response => {
      var valueCol = directories[reqObj.directoryID].value
      var labelCol = directories[reqObj.directoryID].label
      var respObj = {
        data: response.data.rows.map(row => {
          return {
            value: row[valueCol],
            label: row[labelCol]
          }
        }),
        directoryID: reqObj.directoryID,
        uniqueID: reqObj.uniqueID
      }
      commit(types.UPDATE_CHECKLIST, respObj)
    }).catch(error => {
      commit(types.FETCH_FAIL, error)
    })
  }
}

const mutations = {
  [types.UPDATE_CHECKLIST] (state, mutateObj) {
    Vue.set(state, mutateObj.uniqueID, mutateObj.data)
  },
  [types.FETCH_FAIL] (state, error) {
    console.error(error)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
