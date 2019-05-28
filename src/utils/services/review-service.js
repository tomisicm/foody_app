import http from './http-service'

class ReviewService {
  getReviewsByItemId (id) {
    return http
      .get(`/api/review/item/${id}`)
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
