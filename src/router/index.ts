import Login from '@/pages/login.vue'
import Register from '@/pages/register.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/register', component: Register },
  { path: '/login', component: Login },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
