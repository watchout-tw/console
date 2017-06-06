// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Navigation from './components/Navigation'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

Vue.config.productionTip = false

Vue.use(ElementUI)

var menu = [
  {
    id: 'c0ngress',
    name: '立法院',
    pages: [
      {
        id: 'terms',
        name: '屆次、會期'
      },
      {
        id: 'committees',
        name: '委員會'
      },
      {
        id: 'reps',
        name: '委員'
      },
      {
        id: 'districts',
        name: '選區'
      },
      {
        id: 'parties',
        name: '政黨'
      },
      {
        id: 'caucuses',
        name: '黨團、政團'
      }
    ]
  },
  {
    id: 'topics',
    name: '議題、法案',
    pages: [
      {
        id: 'topics',
        name: '大議題、小議題'
      },
      {
        id: 'acts',
        name: '法案'
      },
      {
        id: 'actFeatures',
        name: '法案比較'
      }
    ]
  },
  {
    id: 'speeches',
    name: '委員表態',
    pages: [
      {
        id: 'statements',
        name: '發言'
      },
      {
        id: 'sponsorships',
        name: '提案、連署'
      },
      {
        id: 'votes',
        name: '表決'
      }
    ]
  }
]

new Vue({
  el: '#navigation',
  data() {
    return {
      menu
    }
  },
  template: '<Navigation/>',
  components: { Navigation }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
