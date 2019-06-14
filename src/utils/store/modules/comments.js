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
  }
}

// when new comment is created ill be on the page one. that seems appropriate.
const actions = {
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
  params: state => state.comments.params
}

export const commentStore = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
