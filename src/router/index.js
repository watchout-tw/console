import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'
import Hello from '@/components/Hello'
import List from '@/components/List'
import Editor from '@/components/Editor'
import Waa from '@/components/Waa'
import menu from '@/menu'
import * as util from 'common/src/lib/util'

const customInterface = {
  waa: Waa
}

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

const setRoute = (path, name, component, page) => {
  routes.push({
    path: path,
    name: name,
    component: component,
    props: {
      page
    },
    beforeEnter: checkAuth
  })
}

for(let group of menu) {
  if(group.customInterface) {
    for(let component of group.customComponents) {
      let page = group.pages[0]
      setRoute(page.routes.list.path, page.routes.list.name, customInterface[component], page)
      setRoute(page.routes.edit.path, page.routes.edit.name, customInterface[component], page)
    }
    continue
  }
  for(let page of group.pages) {
    setRoute(page.routes.list.path, page.routes.list.name, List, page)
    setRoute(page.routes.edit.path, page.routes.edit.name, Editor, page)
  }
}

export default new Router({
  mode: 'history',
  routes
})
