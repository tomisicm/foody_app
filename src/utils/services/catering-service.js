import http from './http-service'

class CateringService {
  searchForCatering (body) {
    return http
      .post('/api/catering/search', body)
      .then(({ data }) => {
        console.log(data)
        return data
      })
      .catch(error => {
        throw error
      })
  }
}

const cateringService = new CateringService()

export default cateringService
