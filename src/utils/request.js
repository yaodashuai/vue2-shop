import axios from 'axios'
import { Toast } from 'vant'
import store from '@/store'
const instance = axios.create({
  baseURL: 'http://smart-shop.itheima.net/index.php?s=/api',
  timeout: 5000
})

instance.interceptors.request.use(function (config) {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    loadingType: 'spinner',
    duration: 0
  })
  const token = store.getters.token
  if (token) {
    config.headers['Access-Token'] = token
  }
  config.headers.platform = 'h5'
  return config
}, function (error) {
  return Promise.reject(error)
})

instance.interceptors.response.use(function (result) {
  const res = result.data
  if (res.status !== 200) {
    Toast(res.message)
    Promise.reject(res.message)
  } else {
    Toast.clear()
  }
  return res
}, function (error) {
  return Promise.reject(error)
})

export default instance
