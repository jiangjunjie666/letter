//axios实例
import axios from 'axios'

const http = axios.create({
  baseURL: 'localhost:8080/api/',
  timeout: 5000
})

//请求拦截器
http.interceptors.request.use(
  (config) => {
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
