import http from './http-service'

class UserService {
  uploadUserAvatar ({ payload }) {
    return http
      .post('/api/me/avatar', payload)
      .then(({ data }) => {
        return data
      })
      .catch(error => {
        throw error
      })
  }
}

const userService = new UserService()
export default userService
