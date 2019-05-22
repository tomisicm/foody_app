import http from './http-service'

class AuthService {
  login (email, password) {
    return http
      .post('/signin', {
        email,
        password
      })
      .then(response => {
        this.loggingIn(response.data)
        return response
      })
  }

  register ({ name, email, password }) {
    return http
      .post('/signup', {
        name,
        email,
        password
      })
      .then(({ data }) => {
        this.loggingIn(data)
        return data
      })
      .catch(error => Promise.reject(error.response.data.errors))
  }

  logout () {
    // signout route discussion
    /* return http.get('/signout')
    .then(() => { } */
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    localStorage.removeItem('id')
    this.setAuthHeaders()
    return Promise.resolve()
  }

  setAuthHeaders (token) {
    if (!token) {
      delete http.defaults.headers.common['authorization']
      return
    }
    return (http.defaults.headers.common['authorization'] = `Bearer ${token}`)
  }

  loggingIn (data) {
    localStorage.setItem('user', JSON.stringify(data.user))
    localStorage.setItem('token', data.token)
    localStorage.setItem('id', data.user._id)
    this.setAuthHeaders(data.token)
  }
}

const checkToken = service => {
  let token = localStorage.getItem('token')

  if (token) {
    service.setAuthHeaders(token)
  }
}

const authService = new AuthService()

checkToken(authService)

export default authService
