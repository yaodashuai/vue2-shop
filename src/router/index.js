import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/layout/home'
import Cart from '@/views/layout/cart'
import Category from '@/views/layout/category'
import User from '@/views/layout/user'

import Store from '@/store'
Vue.use(VueRouter)

const Login = () => import('@/views/login')
const Layout = () => import('@/views/layout')
const Pay = () => import('@/views/pay')
const MyOrder = () => import('@/views/myorder')
const ProDetail = () => import('@/views/prodetail')
const SearchList = () => import('@/views/search/list')
const Search = () => import('@/views/search')

const routes = [
  { path: '/login', component: Login },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      { path: '/home', component: Home },
      { path: '/cart', component: Cart },
      { path: '/category', component: Category },
      { path: '/user', component: User }
    ]
  },
  { path: '/pay', component: Pay },
  { path: '/myorder', component: MyOrder },
  { path: '/prodetail/:id', component: ProDetail },
  { path: '/searchlist', component: SearchList },
  { path: '/search', component: Search }
]

const router = new VueRouter({
  routes
})

const authUrls = ['/pay', '/myorder']

router.beforeEach((to, from, next) => {
  if (!authUrls.includes(to.path)) {
    next()
    return
  }
  const token = Store.state.user.userInfo.token
  if (token) {
    next()
  } else {
    next('/login')
  }
})

export default router
