function getInitialState () {
  return {
    errors: {}
  }
}

const state = getInitialState()

const actions = {
  handleError ({ commit }, error) {
    const { data } = error.response
    commit('SET_ERRORS', data.errors)
  }
}

const mutations = {
  CLEAR_ALL_ERRORS (state) {
    state.errors = {}
  },

  SET_ERRORS (state, errors) {
    state.errors = errors
  }
}

const getters = {
  errors: state => state.errors
}

export const errors = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
