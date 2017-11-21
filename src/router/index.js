import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'
import Hello from '@/components/Hello'
import List from '@/components/List'
import Editor from '@/components/Editor'
import menu from '@/menu'
import * as util from 'common/src/lib/util'

Vue.use(Router)
Vue.use(Meta, {
  tagIDKeyName: 'vmid'
})

const checkAuth = (from, to, next) => {
  if(!(util.jwtTokenIsHere() && util.isAdmin())) {
    next({
      name: 'hello'
    })
  } else {
    next()
  }
}

var routes = [
  {
    path: '/',
    name: 'hello',
    component: Hello
  }
]
for(let group of menu) {
  for(let page of group.pages) {
    routes.push({
      path: page.routes.list.path,
      name: page.routes.list.name,
      component: List,
      props: {
        page
      },
      beforeEnter: checkAuth
    })
    routes.push({
      path: page.routes.edit.path,
      name: page.routes.edit.name,
      component: Editor,
      props: {
        page
      },
      beforeEnter: checkAuth
    })
  }
}

export default new Router({
  mode: 'history',
  routes
})
