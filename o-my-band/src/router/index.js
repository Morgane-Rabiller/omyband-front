import { createRouter, createWebHistory } from 'vue-router'
import ConnectionView from '../views/ConnectionView.vue'
import RegistrationView from '../views/RegistrationView.vue'

const routes = [
  {
    path: '/',
    name: 'connexion',
    component: ConnectionView
  },
  {
    path: '/registration',
    name: 'registration',
    component: RegistrationView
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
