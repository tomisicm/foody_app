import cartService from '@/utils/services/cuisine-service'

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

  UPDATE_ITEM (state, index) {
    state.orders[index].quantity++
  },

  SET_DATA (state, orders) {
    state.orders = [state.orders, ...orders]
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
    const index = state.orders.findIndex(
      cartItem => cartItem.menuItem._id === item._id
    )

    if (index > -1) {
      return commit('UPDATE_ITEM', index)
    }
    commit('PUSH_ITEM', item)
  },

  async makeOrder ({ commit, state }) {
    const body = state.orders
    const { data } = await cartService.makeOrder(body)
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
