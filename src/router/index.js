import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import Favorites from '../components/Favorites.vue'
import Details from '../components/Details.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: Favorites
    },
    {
      path: '/details/:bookId',
      name: 'details',
      component: Details,
      params: true
    }
  ]
})

export default router
