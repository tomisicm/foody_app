import authService from '@/utils/services/auth-service'
import _ from 'lodash'

const getUserFromLocalStorage = () => {
  const user = localStorage.getItem('user')
  if (user) return JSON.parse(user)
}

function getInitialState () {
  return {
    user: getUserFromLocalStorage() || null
  }
}

const state = getInitialState()

const mutations = {
  SET_DATA (state, { user }) {
    state.user = user
  }
}

const actions = {
  async login ({ commit }, { email, password }) {
    try {
      // const response =
      await authService.login(email, password)

      commit('SET_DATA', getUserFromLocalStorage())
    } catch (error) {
      throw error
    }
  },

  async register ({ commit }, user) {
    try {
      commit('SET_DATA', await authService.register(user))
    } catch (e) {
      throw e
    }
  },

  async logout ({ commit }) {
    authService.logout().then(() => {
      commit('SET_DATA', { user: null })
    })
  }
}

const getters = {
  user: state => state.user,
  isSignedIn: state => !_.isNull(state.user)
}

export const authStore = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
