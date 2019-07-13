// import cartService from '@/utils/services/cuisine-service'

function getInitialState () {
  return {
    orders: []
  }
}

const state = getInitialState()

const mutations = {
  PUSH_ITEM (state, order) {
    state.orders.push({ menuItem: order, quantity: 1 })
  },
  UPDATE_ITEM (state, order) {
    console.log('update')
  }
}

const actions = {
  /* async getCartItems ({ commit }) {
    try {
      const { data } = await cartService.getCartItems()

      commit('SET_DATA', data.docs)
    } catch (error) {
      throw error
    }
  }, */

  addToCart ({ commit, state }, item) {
    console.log(
      state.orders.some(cartItem => cartItem.menuItem._id === item._id)
    )

    console.log(state)
    console.log(item._id)

    if (state.orders.some(cartItem => cartItem.menuItem._id === item._id)) {
      commit('UPDATE_ITEM', item)
    }

    commit('PUSH_ITEM', item)
  }
}

const getters = {
  orders: state => state.orders
}

export const cartStore = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
