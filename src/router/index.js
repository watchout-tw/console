import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import List from '@/components/List'
import Editor from '@/components/Editor'
import menu from '@/menu'

Vue.use(Router)

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
      path: '/' + page.id,
      name: page.routes.list.name,
      component: List,
      props: {
        page
      }
    })
    routes.push({
      path: '/' + page.id + '/:id',
      name: page.routes.edit.name,
      component: Editor,
      props: {
        page
      }
    })
  }
}

export default new Router({
  mode: 'history',
  routes
})
