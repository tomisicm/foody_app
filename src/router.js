import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import Facility from './views/Facility'
import Review from './views/Review'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      props: true,
      component: Home
    },
    {
      path: '/objects',
      name: 'objects',
      props: true,
      component: Home
    },
    {
      path: '/objects/:id',
      name: 'object',
      props: true,
      component: Facility
    },
    {
      path: '/reviews',
      name: 'reviews',
      props: true,
      component: Review
    }
  ]
})
