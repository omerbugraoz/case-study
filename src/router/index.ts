import { createRouter, createWebHistory } from 'vue-router'
import TrackerPage from '../views/TrackerPage.vue'
import AssetsPage from '../views/AssetsPage.vue'
import NotFound from '../views/NotFound.vue'

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
      component: TrackerPage,
    },
    {
      path: '/assets',
      name: 'Assets',
      component: AssetsPage,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound,
    },
  ],
})

export default router
