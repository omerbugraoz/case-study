import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/tracker',
    },
    {
      path: '/tracker',
      name: 'Tracker',
      component: () => import('../views/TrackerPage.vue'),
    },
    {
      path: '/assets',
      name: 'Assets',
      component: () => import('../views/AssetsPage.vue'),
    },
  ],
})

export default router
