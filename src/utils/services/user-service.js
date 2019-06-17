import http from './http-service'

class UserService {
  uploadUserAvatar (file) {
    return http
      .post('/api/user/avatar', file)
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
