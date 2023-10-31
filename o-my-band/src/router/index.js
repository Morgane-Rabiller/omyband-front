import { createRouter, createWebHistory } from 'vue-router'
import ConnectionView from '../views/ConnectionView.vue'
import RegistrationView from '../views/RegistrationView.vue'
import ValidationPage from '../components/ValidationPage.vue'
import HomeView from '../views/HomeView.vue'
import AnnouncementView from '../views/AnnouncementView.vue'
import AddAnnouncementView from '../views/AddAnnouncementView.vue'
import ProfilView from '../views/ProfilView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/connection',
    name: 'connection',
    component: ConnectionView
  },
  {
    path: '/registration',
    name: 'registration',
    component: RegistrationView
  },
  {
    path: '/validation',
    name: 'validation',
    component: ValidationPage
  },
  {
    path: '/announcement',
    name: 'announcement',
    component: AnnouncementView
  },
  {
    path: '/add-announcement',
    name: 'newAnnouncement',
    component: AddAnnouncementView
  },
  {
    path:'/profil',
    name: 'profil',
    component: ProfilView
  }
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
