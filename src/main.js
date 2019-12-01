import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'
import '@/styles/index.scss' // global css
import App from './App'
import store from './store'
import router from './router'

import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

import * as filters from './filters' // global filters
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
import { mockXHR } from '../mock'
if (process.env.NODE_ENV === 'production') {
  mockXHR()
}

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false
Vue.prototype.apiUrl = 'http://admin.rocheprogram.com/index.html#/vip-user-import'//'https://admin.roche.jiappo.cn/'
// 任务分类
Vue.prototype.str1 = '5224d6ba56e246498b253ac670c6059b'
// 人群标签
Vue.prototype.str2 = 'cc0d4a2bc44341158a41562f6b530690'
// 任务名称
Vue.prototype.str3 = 'fe7f12ebb5874767a7c38ded116c6f3g'

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
