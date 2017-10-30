import { Message } from 'element-ui'
import router from '@/router'
import * as api from '@/util/api'
import * as types from '../mutation-types'

const messages = {
  failure: '編輯失敗',
  success: '編輯成功'
}

const state = {
  cascadeQue: []
}

const getters = {
  cascadeQue: state => state.cascadeQue
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
  patchForm ({ commit, dispatch }, reqObj) {
    api.patchForm(reqObj).then(response => {
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
  },
  updateCascade ({ commit }, reqObj) {
    commit(types.UPDATE_CASCADE, reqObj)
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
    console.error('Status Code', error.response.status)
    console.error('Messages', error.response.data)
  },
  [types.UPDATE_CASCADE] (state, cascadeInfo) {
    state.cascadeQue = []
    state.cascadeQue.push(cascadeInfo)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
