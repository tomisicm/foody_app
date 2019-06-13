import http from './http-service'

class CommentService {
  getCommentsByItemId (id, params) {
    return http
      .get(`/api/comment/item/${id}`, {
        params
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

  editComment (comment) {
    const { _id, body } = comment

    return http
      .put(`/api/comment/${_id}`, { body: body })
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
