import * as types from '../mutation-types'
import * as api from '@/util/api'
import * as factory from '@/util/factory'
import Vue from 'vue'

const state = {
}

const getters = {
}

const actions = {
  updateChecklist ({ commit }, reqObj) {
    api.getDirectory(reqObj).then(response => {
      var respObj = {
        data: factory.assembleDirectoryList(reqObj.directoryID, response.data.rows),
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
