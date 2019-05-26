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
  async getCuisine ({ commit }, page, perPage) {
    try {
      const cuisine = await cuisineService.getCuisine()
      console.log(cuisine)
      commit('SET_DATA', cuisine)
    } catch (error) {
      throw error
    }
  }
}

const getters = {
  cuisine: state => state.cuisine
}

export const cuisineStore = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
