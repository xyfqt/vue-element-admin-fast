import axios from 'axios'
import { Notification } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import StringUtils from './StringUtils'

// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_URL, // url = base url + request url
  timeout: 10000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    const userObj = localStorage.getItem('user')
    if (!StringUtils.isEmpty(userObj)) {
      const user = JSON.parse(userObj)
      config.headers['token'] = user.token
      config.headers['userId'] = user.id
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    if (res.code == 0) {
      Notification({
        title: '错误',
        message: res.info || 'Error',
        type: 'error',
      })
    }
    return res
  },
  error => {
    let msg = ''
    if (error.response && error.response.status == 403) {
      window.location.href = '#/403'
      msg = '账号暂无操作权限，请联系管理员'
    } else if (error.response && error.response.status == 401) {
      msg = '登录过期,请重新登录'
    } else if(!error.response){
      if(error.toString().includes("Network Error")){
        msg = '服务已断开，请稍候再试'
      }else  if(error.toString().includes("timeout")){
        msg = '服务器连接超时，请稍后重试'
      }else {
        msg = '服务异常，请稍候再试'
      }
    } else {
      msg = '服务异常'
    }
    Notification({
      title: '错误',
      message: msg,
      type: 'error',
    })
    return Promise.reject(error)
  }
)

export default service
