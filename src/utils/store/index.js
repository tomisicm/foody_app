import Vue from 'vue'
import Vuex from 'vuex'
import { authStore } from './modules/auth'
import { errorsStore } from './modules/errors'

import { cuisineStore } from './modules/cuisine'
import { commentStore } from './modules/comments'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    authStore,
    errorsStore,
    cuisineStore,
    commentStore
  }
})

export default store
