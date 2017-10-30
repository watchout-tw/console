import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getters from './getters'
import actions from './actions'
import editor from './modules/editor'
import mutations from './mutations'
import editorChecklist from './modules/editorChecklist'
import directory from './modules/directory'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  modules: {
    editor,
    editorChecklist,
    directory
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
