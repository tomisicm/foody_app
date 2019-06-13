import commentService from '@/utils/services/comment-service'

function getInitialState () {
  return {
    comments: {}
  }
}

const state = getInitialState()

const mutations = {
  SET_DATA (state, comments) {
    state.comments = comments
  }
}

const actions = {
  /*   async createComment ({ commit }, comment) {
    try {
      const { data } = await commentService.createComment()

      // commit('UPDATE_DATA', data.docs)
    } catch (error) {
      throw error
    }
  }, */

  /*   async deleteComment ({ commit }, commentId) {
    try {
      const { data } = await commentService.deleteComment(commentId)
    } catch (error) {
      throw error
    }

    // commit('REMOVE_DATA', data.docs)
  }, */

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
  comments: state => state.comments
}

export const commentStore = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
