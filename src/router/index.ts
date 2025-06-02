import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
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
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/NotFound.vue'),
    },
  ],
})

export default router
