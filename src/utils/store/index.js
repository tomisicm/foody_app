import Vue from 'vue'
import Vuex from 'vuex'
import { authStore } from './modules/auth'
import { errorsStore } from './modules/errors'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    authStore,
    errorsStore
  }
})

export default store
