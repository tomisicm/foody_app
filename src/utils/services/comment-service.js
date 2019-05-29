import http from './http-service'

class CommentService {
  getCommentsByItemId (id, { page = 1, perPage = 10 }) {
    return http
      .get(`/api/comment/item/${id}`, {
        params: {
          page: page,
          perPage: perPage
        }
      })
      .then(({ data }) => {
        return data
      })
      .catch(error => {
        throw error
      })
  }

  createComment (comment) {
    return http
      .post('/api/comment/', comment)
      .then(({ data }) => {
        return data
      })
      .catch(error => {
        throw error
      })
  }

  deleteComment (id) {
    return http
      .delete(`/api/comment/${id}`)
      .then(({ data }) => {
        return data
      })
      .catch(error => {
        throw error
      })
  }

  editComment (commentId, comment) {
    return http
      .put(`/api/comment/${commentId}`, comment)
      .then(({ data }) => {
        return data
      })
      .catch(error => {
        throw error
      })
  }
}

const commentService = new CommentService()

export default commentService
