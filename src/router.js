import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Facility from './views/Facility.vue'

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
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
