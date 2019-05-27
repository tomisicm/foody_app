import http from './http-service'

class CateringService {
  searchForCatering (body, { page = 1, perPage = 10 }) {
    return http
      .post('/api/catering/search', body, { params: { page, perPage } })
      .then(({ data }) => {
        return data
      })
      .catch(error => {
        throw error
      })
  }

  getCatering (id) {
    return http
      .get(`/api/catering/${id}`)
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
