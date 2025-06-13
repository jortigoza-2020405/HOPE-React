import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:5500', // Tu backend actual
  timeout: 2000
})

// Interceptor para enviar token si existe
apiClient.interceptors.request.use(
  (config) => {
    const userData = localStorage.getItem('user')
    if (userData) {
      const token = JSON.parse(userData).token
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (err) => Promise.reject(err)
)

export default apiClient
