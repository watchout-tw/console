import * as types from '../mutation-types'
import * as api from '@/util/api'
import { Message } from 'element-ui'

const errorMsg = '編輯失敗'
const successMsg = '編輯成功'

const state = {

}

const getters = {

}

const actions = {
  submitForm ({ commit, dispatch }, reqObj) {
    api.postMockForm(reqObj).then(response => {
      dispatch('showSuccessAlert')
    }).catch(error => {
      commit(types.POST_FAIL, error)
      dispatch('showFailAlert', error)
    })
  },
  showSuccessAlert ({ commit }, reqObj) {
    commit(types.SHOW_SUCCESS_ALERT)
  },
  showFailAlert ({ commit }, reqObj) {
    commit(types.SHOW_FAIL_ALERT)
  }
}

const mutations = {
  [types.SHOW_SUCCESS_ALERT] (state) {
    Message({
      message: successMsg,
      type: 'success'
    })
  },
  [types.SHOW_FAIL_ALERT] (state) {
    Message({
      message: errorMsg,
      type: 'error'
    })
  },
  [types.POST_FAIL] (state, error) {
    console.log('error', error)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
