import Vue from 'vue'
import Router from 'vue-router'

import AppAuth from '../views/AppAuth'
import AppLanding from '../views/AppLanding'
import AppLogin from '../views/AppLogin'
import AppRegister from '../views/AppRegister'
import Profile from '../views/Profile'

import Home from '../views/Home'
import Catering from '../views/Catering'
import NewCateringForm from '../components/NewCateringForm'
import CateringFacility from '../views/CateringFacility'

import Review from '../views/Review'
import Reviews from '../views/Reviews'
import NewReview from '../views/NewReview'

import store from '@/utils/store'

Vue.use(Router)

store.dispatch('cuisineStore/getCuisine')

const router = new Router({
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
          component: AppLogin,
          meta: {
            isAuthenticated: false
          }
        },
        {
          name: 'register',
          path: 'register',
          component: AppRegister,
          meta: {
            isAuthenticated: false
          }
        },
        {
          name: 'profile',
          path: 'profile',
          component: Profile,
          meta: {
            isAuthenticated: false
          }
        }
      ]
    },
    {
      path: '/home',
      name: 'home',
      component: AppLanding,
      meta: {
        isAuthenticated: false
      }
    },
    {
      path: '/catering',
      name: 'caterings',
      props: true,
      component: Home,
      meta: {
        isAuthenticated: false
      }
    },
    {
      path: '/catering',
      component: Catering,
      children: [
        {
          name: 'newcatering',
          path: '/catering/add',
          component: NewCateringForm,
          meta: {
            isAuthenticated: true
          }
        },
        {
          name: 'editcatering',
          path: '/catering/:id/edit',
          component: NewCateringForm,
          props: { inEdit: true },
          meta: {
            isAuthenticated: true
          }
        }
      ]
    },
    {
      path: '/catering/:id',
      name: 'catering',
      props: true,
      component: CateringFacility,
      meta: {
        isAuthenticated: false
      }
    },
    {
      path: '/reviews/add',
      name: 'addreview',
      props: true,
      component: NewReview,
      meta: {
        isAuthenticated: true
      }
    },
    {
      path: '/reviews/:id',
      name: 'review',
      props: true,
      component: Review,
      meta: {
        isAuthenticated: false
      }
    },
    {
      path: '/reviews',
      name: 'reviews',
      props: true,
      component: Reviews,
      meta: {
        isAuthenticated: false
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const isAuth = store.getters['authStore/isSignedIn']

  // user not logged and wants to acces part of app which requires autheticated user
  if (!isAuth && to.meta.isAuthenticated) {
    return next({ name: 'signin' })
  } else next()
})

// TODO: user can only edit his own reviews
// TODO: user can only edit catering places he added

export default router
