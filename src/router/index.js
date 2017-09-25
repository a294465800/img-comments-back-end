import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Index from '@/components/Index'
import Index_content from '@/components/Index_content'
import List_teacher_count from '@/components/List_teacher_count'
import List_teacher from '@/components/List_teacher'
import Article from '@/components/Article'
import Article_upload from '@/components/Article_upload'

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
      name: 'List_teacher_count',
      component: List_teacher_count,
    }, {
      path: 'list/teacher',
      name: 'List_teacher',
      component: List_teacher,
    }, {
      path: 'article',
      name: 'Article',
      component: Article,
    }, {
      path: 'article/upload',
      name: 'Article_upload',
      component: Article_upload,
    }]
  }]
})
