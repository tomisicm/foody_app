import Vue from 'vue'
import Router from 'vue-router'

import AppAuth from '@/views/AppAuth'
import AppLanding from '@/views/AppLanding'
import AppLogin from '@/views/AppLogin'
import AppRegister from '@/views/AppRegister'

import Forbidden from '@/components/containers/Forbidden'
import NotFound from '@/components/containers/NotFound'

import Profile from '@/views/Profile'

import AllCaterings from '@/views/AllCaterings'
import CateringContainer from '@/views/CateringContainer'
import CateringForm from '@/components/CateringForm'
import CateringFacility from '@/views/CateringFacility'

import Review from '@/views/Review'
import Reviews from '@/views/Reviews'
import NewReview from '@/views/NewReview'

import OrderConainer from '@/views/OrderConainer'

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
            isAuthenticated: true
          }
        },
        {
          name: 'forbidden',
          path: 'forbidden',
          component: Forbidden,
          meta: {
            isAuthenticated: false
          }
        },
        {
          name: 'notfound',
          path: 'notfound',
          component: NotFound,
          meta: {
            isAuthenticated: false
          }
        }
      ]
    },
    {
      path: '/',
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
      component: AllCaterings,
      meta: {
        isAuthenticated: false
      }
    },
    {
      path: '/catering',
      component: CateringContainer,
      children: [
        {
          name: 'addcatering',
          path: '/catering/add',
          component: CateringForm,
          meta: {
            isAuthenticated: true
          }
        },
        {
          name: 'editcatering',
          path: '/catering/:id/edit',
          component: CateringForm,
          props: { inEdit: true },
          meta: {
            isAuthenticated: true
          }
        }
      ]
    },
    {
      path: '/catering/:id',
      component: CateringContainer,
      children: [
        {
          name: 'viewcatering',
          path: '/catering/:id',
          props: true,
          component: CateringFacility,
          meta: {
            isAuthenticated: false
          }
        },
        {
          name: 'ordercatering',
          path: '/catering/:id/order',
          props: true,
          component: OrderConainer,
          meta: {
            isAuthenticated: true
          }
        }
      ]
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
