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
}

const reviewService = new ReviewService()

export default reviewService
