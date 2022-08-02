import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "overdue" */ '../views/WelcomeView.vue')
  },
  {
    path: '/wines',
    name: 'wines',
    component: () => import(/* webpackChunkName: "overdue" */ '../views/WineView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
