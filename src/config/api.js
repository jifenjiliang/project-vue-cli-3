/**
 2  * http配置
 3  */
// 引入axios以及element ui中的loading和message组件
// 请求列表数据
/* axios 请求方式
 axios.request(config)

 axios.get(url[, config])

 axios.delete(url[, config])

 axios.head(url[, config])

 axios.post(url[, data[, config]])

 axios.put(url[, data[, config]])

 axios.patch(url[, data[, config]])
 */
import axios from 'axios'
import {
  Loading,
  Message
} from 'element-ui'
// 超时时间
axios.defaults.timeout = 5000
// http请求拦截器
var loadinginstace
axios.interceptors.request.use(config => {
  // element ui Loading方法
  loadinginstace = Loading.service({
    fullscreen: true
  })
  return config
}, error => {
  loadinginstace.close()
  Message.error({
    message: '加载超时'
  })
  return Promise.reject(error)
})
// http响应拦截器
axios.interceptors.response.use(data => { // 响应成功关闭loading
  loadinginstace.close()
  return data
}, error => {
  loadinginstace.close()
  Message.error({
    message: '加载失败'
  })
  return Promise.reject(error)
})

export default axios
