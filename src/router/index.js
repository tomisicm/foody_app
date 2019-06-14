import Vue from 'vue'
import Router from 'vue-router'

import AppAuth from '../views/AppAuth'
import AppLanding from '../views/AppLanding'
import AppLogin from '../views/AppLogin'
import AppRegister from '../views/AppRegister'
import Profile from '../views/Profile'

import Home from '../views/Home'
import CateringFacility from '../views/CateringFacility'
import Review from '../views/Review'
import Reviews from '../views/Reviews'

import NewReview from '../views/NewReview'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'auth',
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
        },
        {
          name: 'profile',
          path: 'profile',
          component: Profile
        }
      ]
    },
    {
      path: '/home',
      name: 'home',
      component: AppLanding
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      props: true,
      component: Home
    },
    /* {
      path: '/catering',
      props: true,
      component: Home
    }, */
    {
      path: '/catering/:id',
      name: 'catering',
      props: true,
      component: CateringFacility
    },
    {
      path: '/reviews/add',
      name: 'addreview',
      props: true,
      component: NewReview
    },
    {
      path: '/reviews/:id',
      name: 'review',
      props: true,
      component: Review
    },
    {
      path: '/reviews',
      name: 'reviews',
      props: true,
      component: Reviews
    }
  ]
})
