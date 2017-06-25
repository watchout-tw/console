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
  },
  {
    path: '/terms/:id',
    name: 'editor-term',
    component: Editor,
    props: {
      page: {
        id: 'editor-term',
        name: 'editor-term',
        title: '屆期編輯器'
      }
    }
  }
]
for(let group of menu) {
  for(let page of group.pages) {
    routes.push({
      path: '/' + page.id,
      name: page.id,
      component: List,
      props: {
        page: page
      }
    })
  }
}

export default new Router({
  mode: 'history',
  routes
})
