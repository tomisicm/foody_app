import Vue from 'vue'
import Vuex from 'vuex'
import { authStore } from './modules/auth'
import { errorsStore } from './modules/errors'

import { cuisineStore } from './modules/cuisine'
import { commentStore } from './modules/comments'
import { cartStore } from './modules/cart'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    authStore,
    errorsStore,
    cuisineStore,
    commentStore,
    cartStore
  }
})

export default store
