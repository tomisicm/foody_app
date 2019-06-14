import commentService from '@/utils/services/comment-service'

function getInitialState () {
  return {
    comments: {
      docs: []
    },
    params: {
      page: 1,
      limit: 10
    }
  }
}

const state = getInitialState()

const mutations = {
  SET_DATA (state, comments) {
    state.comments = comments
  },

  SET_PAGE (state, page) {
    state.params.page = page
  },

  SET_PER_PAGE (state, perPage) {
    state.params.perPage = perPage
  }
}

const actions = {
  changePage ({ commit }, page) {
    commit('SET_PAGE', page)
  },

  changePerPage ({ commit }, perPage) {
    commit('SET_PER_PAGE', perPage)
  },

  async createComment ({ commit, dispatch, getters }, comment) {
    try {
      const { data } = await commentService.createComment(comment)

      dispatch('getCommentsByItemId', {
        itemId: data.item,
        params: getters.params
      })
    } catch (error) {
      throw error
    }
  },

  async deleteComment ({ commit, dispatch, getters }, commentId) {
    try {
      const { data } = await commentService.deleteComment(commentId)

      dispatch('getCommentsByItemId', {
        itemId: data.item,
        params: getters.params
      })
    } catch (error) {
      throw error
    }
  },

  async getCommentsByItemId ({ commit }, { itemId, params }) {
    try {
      const { data } = await commentService.getCommentsByItemId(itemId, params)

      commit('SET_DATA', data)
    } catch (error) {
      throw error
    }
  }
}

const getters = {
  comments: state => state.comments,
  params: state => state.params
}

export const commentStore = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
