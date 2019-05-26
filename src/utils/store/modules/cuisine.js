import cuisineService from '@/utils/services/cuisine-service'

function getInitialState () {
  return {
    cuisine: []
  }
}

const state = getInitialState()

const mutations = {
  SET_DATA (state, cuisine) {
    state.cuisine = cuisine
  }
}

const actions = {
  async getCuisine ({ commit }, page, perPage) {
    try {
      const { data } = await cuisineService.getCuisine()

      commit('SET_DATA', data.docs)
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
