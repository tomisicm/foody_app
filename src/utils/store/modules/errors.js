// import _ from 'lodash'
// TODO: Research MAP as the errors collection

function getInitialState () {
  return {
    errors: {}
  }
}

const state = getInitialState()

const actions = {
  handleError ({ commit }, error) {
    commit('SET_ERRORS', error)
  },

  clearErrors ({ commit }, field) {
    commit('CLEAR_ERRORS', field)
  }
}

const mutations = {
  CLEAR_ALL_ERRORS (state) {
    state.errors = {}
  },

  SET_ERRORS (state, errors) {
    state.errors = errors
  },

  CLEAR_ERRORS (state, field) {
    if (state.errors[field]) {
      delete state.errors[field]
    }
  }
}

const getters = {
  errors: state => state.errors,
  hasErrors: (state, getters) => field => !!getters.errors[field],
  firstError: (state, getters) => field =>
    getters.hasErrors(field) ? getters.errors[field] : ''
}

export const errorsStore = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
