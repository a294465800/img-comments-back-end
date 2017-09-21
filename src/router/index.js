import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Index from '@/components/Index'
import Index_content from '@/components/Index_content'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/login',
    name: 'Login',
    component: Login
  }, {
    path: '/',
    // name: 'Index',
    component: Index,
    children: [{
      path: '',
      name: 'Index_content',
      component: Index_content,
    }]
  }]
})
