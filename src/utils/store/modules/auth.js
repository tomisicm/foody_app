import authService from '@/utils/services/auth-service'
import _ from 'lodash'
import router from '@/router'

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
      await authService.login(email, password)

      commit('SET_DATA', getUserFromLocalStorage())
      router.push({ name: '/' })
    } catch (error) {
      throw error
    }
  },

  async register ({ commit }, { email, password, passwordConfirm }) {
    try {
      await authService.register(email, password, passwordConfirm)
      router.push({ name: 'signin', params: { userEmail: email } })
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
  isSignedIn: state => !_.isNull(state.user),
  isAdmin: state => (state.user && state.user.admin) || false,
  userId: state => state.user && state.user._id
}

export const authStore = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
