import Vue from 'vue'
import Router from 'vue-router'

import AppAuth from '../views/AppAuth'
import AppLanding from '../views/AppLanding'
import AppLogin from '../views/AppLogin'
import AppRegister from '../views/AppRegister'

import Home from '../views/Home'
import Facility from '../views/Facility'
import Review from '../views/Review'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'auth',
      props: true,
      component: AppAuth,
      children: [
        {
          name: 'signin',
          path: 'signin',
          component: AppLogin
        },
        {
          name: 'register',
          path: 'register',
          component: AppRegister
        }
      ]
    },
    {
      path: '/home',
      name: 'home',
      props: true,
      component: AppLanding
    },
    {
      path: '/dashboard',
      name: 'dashboard',
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
