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

  getMentItemsForCatering (id) {
    return http
      .get(`/api/food/catering/${id}`)
      .then(({ data }) => {
        return data
      })
      .catch(error => {
        throw error
      })
  }

  createMenuItem (body) {
    return http
      .post('/api/food/', body)
      .then(({ data }) => {
        return data
      })
      .catch(error => {
        throw error
      })
  }

  updateMenuItem (id, body) {
    return http
      .put(`/api/food/${id}`, body)
      .then(({ data }) => {
        return data
      })
      .catch(error => {
        throw error
      })
  }

  saveMenuItem (item) {
    const { _id } = item
    if (!_id) {
      return this.createMenuItem(item)
    } else {
      return this.updateMenuItem(_id, item)
    }
  }

  deleteMenuItem (id) {
    return http
      .delete(`/api/food/${id}`)
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
