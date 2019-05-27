import http from './http-service'

class CateringService {
  searchForCatering (body, params) {
    return http
      .post('/api/catering/search', body, { params })
      .then(({ data }) => {
        return data
      })
      .catch(error => {
        throw error
      })
  }
}

const cateringService = new CateringService()

export default cateringService
