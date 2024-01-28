//axios实例
import axios from 'axios'

const http = axios.create({
  baseURL: import.meta.env.VITE_SERVER,
  timeout: 5000
})

//请求拦截器
http.interceptors.request.use(
  //携带token
  (config) => {
    const token = JSON.parse(localStorage.getItem('token'))
    if (token) {
      config.headers.token = token
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

//相应拦截器
http.interceptors.response.use(
  (res) => {
    return res.data
  },
  (err) => {
    return Promise.reject(err)
  }
)
export default http
