import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:5500', // Tu backend actual
  timeout: 2000
})

// Interceptor para enviar token si existe
apiClient.interceptors.request.use(
  config => {
    const userDetails = localStorage.getItem('user')
    if (userDetails) {
      const token = JSON.parse(userDetails).token
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  err => Promise.reject(err)
)

export default apiClient