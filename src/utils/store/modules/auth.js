import authService from '@/utils/services/auth-service'
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
      router.push({ name: 'home' })
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
  isSignedIn: state => !!state.user || false,
  isAdmin: state => (getters.isSignedIn && (state.user || {}).admin) || false,
  userId: state => getters.isSignedIn && state.user && state.user._id
}

export const authStore = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
