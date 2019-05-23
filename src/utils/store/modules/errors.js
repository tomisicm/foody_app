import _ from 'lodash'

function getInitialState () {
  return {
    errors: {}
  }
}

const state = getInitialState()

const actions = {
  handleError ({ commit }, error) {
    commit('SET_ERRORS', error)
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
  errors: state => state.errors,
  hasErrors: (state, getters) => field => !!getters.errors[field],
  firstError: (state, getters) => field =>
    // getters.hasErrors(field) ? _.first(getters.errors[field]) : ''
    console.log(getters.errors['email'])
}

export const errorsStore = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
