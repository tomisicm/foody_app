import authService from '@/utils/services/auth-service'
import router from '@/router'

const getUserFromLocalStorage = () => {
  const user = localStorage.getItem('user')
  if (user) return JSON.parse(user)
}

function getInitialState () {
  return {
    user: getUserFromLocalStorage()
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
      const { data } = await authService.login(email, password)
      commit('SET_DATA', data)

      router.push({ name: 'home' })
    } catch (e) {}
  },
  async register ({ commit }, user) {
    try {
      commit('SET_DATA', await authService.register(user))
      router.push({ name: 'login' })
    } catch (e) {}
  },
  async logout ({ commit }) {
    authService
      .logout()
      .then(() => {
        commit('SET_DATA', { user: null })
      })
      .then(() => {
        router.push({ name: 'login' })
      })
  }
}
const getters = {
  getUser: state => state.user,
  getErrors: state => state.errors
}

export const document = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
