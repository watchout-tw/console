import { Message } from 'element-ui'
import router from '@/router'
import * as api from '@/util/api'
import * as types from '../mutation-types'

const messages = {
  failure: '編輯失敗',
  success: '編輯成功'
}

const state = {
}

const getters = {
}

const actions = {
  submitForm ({ commit, dispatch }, reqObj) {
    api.postForm(reqObj).then(response => {
      router.push({name: reqObj.page.routes.edit.name, params: {id: response.data[reqObj.page.routingIndex]}})
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
      message: messages.success,
      type: 'success'
    })
  },
  [types.SHOW_FAIL_ALERT] (state) {
    Message({
      message: messages.failure,
      type: 'error'
    })
  },
  [types.POST_FAIL] (state, error) {
    console.error('error', error)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
