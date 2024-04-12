//axios实例
import axios from 'axios'
import { ElMessage } from 'element-plus'
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
  (error) => {
    let msg = ''
    let status = error.response.status
    console.log(error)
    //处理token失效
    switch (status) {
      case 401:
        msg = error.response.data
        //实现路由跳转
        router.push('/login')
        localStorage.removeItem('userinfo')
        break
      case 403:
        msg = '无权访问'
        break
      case 404:
        msg = '请求地址错误'
        break
      case 500:
        msg = '服务器出现问题'
        break
      default:
        msg = '无网络'
    }
    ElMessage({
      type: 'error',
      message: msg
    })
    return Promise.reject(error)
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
