import Vue from 'vue'
import Vuex from 'vuex'
import { authStore } from './modules/auth'
import { errorsStore } from './modules/errors'

import { cuisineStore } from './modules/cuisine'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    authStore,
    errorsStore,
    cuisineStore
  }
})

export default store
