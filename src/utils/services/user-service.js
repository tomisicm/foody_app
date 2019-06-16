import http from './http-service'

class UserService {
  uploadUserAvatar (file) {
    console.log(file)

    const formData = new FormData()
    formData.append('file', file)

    return http
      .post('/api/user/avatar', formData)
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
