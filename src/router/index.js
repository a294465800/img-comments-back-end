import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Index from '@/components/Index'
import Index_content from '@/components/Index_content'
import List_student from '@/components/List_student'
import List_teacher from '@/components/List_teacher'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/login',
    name: 'Login',
    component: Login
  }, {
    path: '/',
    component: Index,
    children: [{
      path: '',
      name: 'Index_content',
      component: Index_content,
    }, {
      path: 'list/student',
      name: 'List_student',
      component: List_student,
    }, {
      path: 'list/teacher',
      name: 'List_teacher',
      component: List_teacher,
    }]
  }]
})
