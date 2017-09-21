// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios'
import qs from  'qs'
import 'element-ui/lib/theme-default/index.css'
import API from './assets/js/api'

axios.defaults.headers = {
  'Content-type': 'application/x-www-form-urlencoded'
}
axios.defaults.withCredentials = true
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$qs = qs
Vue.prototype.$api = API

/**
 * 全局钩子
 */
router.beforeEach((to, from, next) => {
  if (sessionStorage.username) {
    if (to.name === 'Login') {
      next(from.path)
    } else {
      next()
    }
  } else {
    if (to.name !== 'Login') {
      next({
        path: '/login'
      })
    } else {
      next()
    }
  }

  // axios.get(globalData.globalData.url + 'web/check')
  //   .then(res => {
  //     if ('1' === res.data.data) {
  //       if (to.name === 'Login') {
  //         next(from.path)
  //       } else {
  //         next()
  //       }
  //     } else {
  //       if (to.name !== 'Login') {
  //         next({
  //           path: '/login'
  //         })
  //       } else {
  //         next()
  //       }
  //     }
  //   }).catch(error => {
  //     iView.Modal.error({
  //       title: '提示',
  //       content: error
  //     })
  //   })
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})
