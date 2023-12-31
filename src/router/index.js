import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import DashBoard from '../views/DashBoard.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About

  },
  {
    path: '/dashboard',
    name: 'DashBoard',
    component: DashBoard

  },
  {
    name:'Home',
    redirect:'/dashboard'
  },
  {
    path:'/:catchAll(.*)',
    redirect:'/dashboard'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router