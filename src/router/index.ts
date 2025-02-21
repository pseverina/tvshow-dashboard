import { createRouter, createWebHistory } from 'vue-router'
import DashboardPage from '@/pages/DashboardPage/DashboardPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardPage,
    },
    {
      path: '/:id',
      name: 'details',
      component: () => import('@/pages/DetailsPage/DetailsPage.vue'),
    },
  ],
})

export default router
