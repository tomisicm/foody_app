import http from './http-service'

class CuisineService {
  getCuisine (page, perPage) {
    return http
      .get('/api/cuisine', {
        params: {
          page,
          perPage
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

const cuisineService = new CuisineService()

export default cuisineService
