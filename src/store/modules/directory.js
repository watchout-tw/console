import * as types from '../mutation-types'
import * as api from '@/util/api'
import * as factory from '@/util/factory'
import Vue from 'vue'
import directories from '@/config/directories'

const state = {
}

const getters = {
}

const actions = {
  cacheDirectory({ commit }, reqObj) {
    let directory = directories[reqObj.directoryID]
    if(directory.api) {
      // fetch values from API
      api.getDirectory(reqObj).then(response => {
        var respObj = {
          data: factory.assembleDirectoryList(reqObj.directoryID, response.data.rows),
          directoryID: reqObj.directoryID
        }
        commit(types.CACHE_DIRECTORY, respObj)
      }).catch(error => {
        commit(types.FETCH_FAIL, error)
      })
    } else {
      // use values defined in directories.js
      if(directory.options) {
        var respObj = {
          data: directory.options,
          directoryID: reqObj.directoryID
        }
        commit(types.CACHE_DIRECTORY, respObj)
      } else {
        commit(types.DIRECTORY_NOT_FOUND)
      }
    }
  }
}

const mutations = {
  [types.CACHE_DIRECTORY](state, mutateObj) {
    Vue.set(state, mutateObj.directoryID, mutateObj.data)
  },
  [types.FETCH_FAIL](state, error) {
    console.error(error)
  },
  [types.DIRECTORY_NOT_FOUND](state) {
    console.error('Directory not found')
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
