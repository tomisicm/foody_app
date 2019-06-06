import http from './http-service'

class ReviewService {
  getReviewsByItemId (id, { page = 1, perPage = 10 }) {
    return http
      .get(`/api/review/item/${id}`, {
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

  getReview (id) {
    return http
      .get(`/api/review/${id}`)
      .then(({ data }) => {
        return data
      })
      .catch(error => {
        throw error
      })
  }

  createReview (review) {
    return http
      .post('/api/review/', review)
      .then(({ data }) => {
        return data
      })
      .catch(error => {
        throw error
      })
  }

  editReview (review) {
    const { _id } = review
    return http
      .put(`/api/review/${_id}`, review)
      .then(({ data }) => {
        return data
      })
      .catch(error => {
        throw error
      })
  }

  changeReviewStatus (id, body) {
    return http
      .put(`/api/review/${id}/status`, body)
      .then(({ data }) => {
        return data
      })
      .catch(error => {
        throw error
      })
  }

  deleteReview (id) {
    return http
      .delete(`/api/review/${id}`)
      .then(({ data }) => {
        return data
      })
      .catch(error => {
        throw error
      })
  }
}

const reviewService = new ReviewService()

export default reviewService
