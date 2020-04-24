import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/Home'
import DraRes from '@/components/DraRes'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/draRes',
      name: 'draRes',
      component: DraRes
    }
  ]
})
