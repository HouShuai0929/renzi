import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'
const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 5000 // request timeout
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    const token = store.state.user.token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  response => {
    // return response.data
    if (response.data.success) {
      return response.data
    } else {
      Message.error(response.data.message)
      return Promise.reject(response.data.message)
    }
  },
  error => {
    if (error.response.status === 401) {
      store.commit('user/logout')
      router.push('/login')
      Message.error('登陆过期,请重新登录')
    } else {
      Message.error(error.message)
    }
    return Promise.reject(error)
  }
)

export default request
