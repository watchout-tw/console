import * as types from './mutation-types'
import Vue from 'vue'

export default {
  [types.UPDATE_SELECT] (state, mutateObj) {
    Vue.set(state, mutateObj.uniqueID, mutateObj.data)
  },
  [types.FETCH_FAIL] (state, error) {
    console.error(error)
  }
}
