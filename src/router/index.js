import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/Home'
import DraRes from '@/components/DraRes'
import selected from '@/components/selected'

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
    },
    {
      path: '/selected',
      name: 'selected',
      component: selected
    }
  ]
})
