// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import ElementUI from 'element-ui'
import ElementLocale from 'element-ui/lib/locale/lang/zh-TW'

import axios from 'axios'
axios.defaults.baseURL = 'https://c0re.watchout.tw'

Vue.config.productionTip = false

Vue.use(ElementUI, { locale: ElementLocale })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
