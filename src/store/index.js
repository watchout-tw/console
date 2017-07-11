import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'
import list from './modules/list'
import editorChecklist from './modules/editorChecklist'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  modules: {
    list,
    editorChecklist
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
