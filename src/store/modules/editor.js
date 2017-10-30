import * as types from '../mutation-types'

const state = {
  cascadeQue: []
}

const getters = {
  cascadeQue: state => state.cascadeQue
}

const actions = {
  updateCascade ({ commit }, reqObj) {
    commit(types.UPDATE_CASCADE, reqObj)
  }
}

const mutations = {
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
