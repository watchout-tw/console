import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import List from '@/components/List'
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
      name: page.id,
      component: List,
      props: {
        page: {
          id: page.id,
          name: page.name,
          title: page.title
        }
      }
    })
  }
}

export default new Router({
  mode: 'history',
  routes
})
