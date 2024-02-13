import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/routes/Home.vue'
import Favorites from '../components/routes/Favorites.vue'
import Details from '../components/routes/Details.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
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
