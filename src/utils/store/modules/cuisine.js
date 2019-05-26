import cuisineService from '@/utils/services/cuisine-service'

function getInitialState () {
  return {
    cuisine: []
  }
}

const state = getInitialState()

const mutations = {
  SET_DATA (state, { cuisine }) {
    state.cuisine = cuisine
  }
}

const actions = {
  async getCuisines ({ commit }, page, perPage) {
    try {
      const cuisines = await cuisineService.getCuisines()
      console.log(cuisines)
      commit('SET_DATA', cuisines)
    } catch (error) {
      throw error
    }
  }
}

const getters = {
  cuisines: state => state.cuisines
}

export const authStore = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
