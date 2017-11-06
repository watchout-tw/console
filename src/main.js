// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import ElementUI from 'element-ui'
import ElementLocale from 'element-ui/lib/locale/lang/zh-TW'

import axios from 'axios'

Vue.config.mode = process.env.BUILD_MODE
Vue.config.productionTip = false

if(Vue.config.mode === 'production') {
  axios.defaults.baseURL = 'https://core.watchout.tw'
} else if(Vue.config.mode === 'staging') {
  axios.defaults.baseURL = 'https://staging.core.watchout.tw'
} else {
  axios.defaults.baseURL = 'https://dev.core.watchout.tw'
}

Vue.use(ElementUI, { locale: ElementLocale })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
