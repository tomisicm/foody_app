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
        console.log(data)
        return data
      })
  }
}

const cuisineService = new CuisineService()

export default cuisineService
