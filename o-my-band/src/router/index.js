import { createRouter, createWebHistory } from 'vue-router'
import ConnectionView from '../views/ConnectionView.vue'
import RegistrationView from '../views/RegistrationView.vue'
import ValidationPage from '../components/ValidationPage'
import HomeView from '../views/HomeView'
import AnnouncementView from '../views/AnnouncementView'
import AddAnnouncementView from '../views/AddAnnouncementView'
import ProfilView from '../views/ProfilView'
import AnnouncementCardView from '../views/AnnouncementCardView'
import MyAnnouncements from '../views/MyAnnouncements'
import FaqView from "../views/FaqView";

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
  },
  {
    path: '/announcement/:id',
    name: 'announcementCard',
    component: AnnouncementCardView
  },
  {
    path: '/myannouncements',
    name: 'announcementCard',
    component: MyAnnouncements
  },
  {
    path: '/faq',
    name: 'faq',
    component: FaqView
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
