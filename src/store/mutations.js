import globalMutations from 'common/src/store/mutations'
import * as types from './mutation-types'
import Vue from 'vue'

const localMutations = {
  [types.UPDATE_SELECT] (state, mutateObj) {
    Vue.set(state, mutateObj.uniqueID, mutateObj.data)
  },
  [types.DELETE_SELECT] (state, mutateObj) {
    Vue.delete(state, mutateObj.uniqueID)
  },
  [types.FETCH_FAIL] (state, error) {
    console.error(error)
  },
  [types.DIRECTORY_NOT_FOUND](state) {
    console.error('Directory not found')
  }
}

export default Object.assign(globalMutations, localMutations)
