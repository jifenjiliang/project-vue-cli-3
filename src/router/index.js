import Vue from 'vue'
import Router from 'vue-router'

// 首页
import index from '@/views/index'

Vue.use(Router)

let routes = [
  {
    path: '/index',
    name: 'index',
    component: index,
    meta: {
      title: 'merchant_h5'
    },
    children: []
  },
  { path: '*', redirect: '/index' }
];

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
