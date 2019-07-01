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

  createCatering (body) {
    return http
      .post('/api/catering/', body)
      .then(({ data }) => {
        return data
      })
      .catch(error => {
        throw error
      })
  }

  updateCatering (id, body) {
    return http
      .put(`/api/catering/${id}`, body)
      .then(({ data }) => {
        return data
      })
      .catch(error => {
        throw error
      })
  }

  saveCatering (id, body) {
    if (!id) {
      return this.createCatering(body)
    } else {
      return this.updateCatering(id, body)
    }
  }

  createMenuItem (body) {
    /* return http
      .post('/api/catering/', body)
      .then(({ data }) => {
        return data
      })
      .catch(error => {
        throw error
      }) */
  }

  updateMenuItem (id, body) {
    /* return http
      .put(`/api/catering/${id}`, body)
      .then(({ data }) => {
        return data
      })
      .catch(error => {
        throw error
      }) */
  }

  saveMenuItem (id, body) {
    /* if (!id) {
      return this.createCatering(body)
    } else {
      return this.updateCatering(id, body)
    } */
  }

  deleteMenuItem (id) {
    /* return http
      .delete(`/api/catering/${id}`)
      .then(({ data }) => {
        return data
      })
      .catch(error => {
        throw error
      }) */
  }
}

const cateringService = new CateringService()

export default cateringService
