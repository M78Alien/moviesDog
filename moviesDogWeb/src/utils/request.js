import axios from 'axios'

// const baseURL = 'http://localhost:8080'
const baseURL = 'http://8.138.199.128:8772'
// 创建 axios 实例，设置基础地址和超时时间
const http = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
})

// axios 请求拦截器
http.interceptors.request.use(
  (config) => {
    return config
  },
  (e) => Promise.reject(e)
)

// axios 响应拦截器
http.interceptors.response.use(
  (res) => res.data,
  (e) => {
    return Promise.reject(e)
  }
)

export default http
export { baseURL }
