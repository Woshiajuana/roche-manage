import axios from 'axios'
import { MessageBox, Message,Alert } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  baseURL:'https://admin.rocheprogram.com', //'https://admin.roche.jiappo.cn/',http://admin.rocheprogram.com
  // baseURL:'https://admin.roche.jiappo.cn', //'https://admin.roche.jiappo.cn/',http://admin.rocheprogram.com
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 30000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      // config.headers['X-Token'] = getToken()
      // config.data.access_token = getToken()
      config.url = config.url + '?access_token=' + getToken()
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
    // if the custom code is not 20000, it is judged as an error.
    res.code = res.Status
    res.message = res.Message
    if (res.code !== 0) {
      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      //if (res.code === 201 || res.code === 50012 || res.code === 50014) {
      if (res.code === 201) {
        // to re-login
        MessageBox.confirm('登录异常，请重新登录', '系统提示', {
          confirmButtonText: '确定',
          showCancelButton:false,
          closeOnClickModal:false,
          closeOnPressEscape:false,
          showClose:false,
          // cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }else{
        Message({
          message: res.message || 'Error',
          type: 'error',
          duration: 5 * 1000
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
