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
import FaqView from "../views/FaqView"
import LegalInformationView from "../views/LegalInformationView"
import ContactAdminView from "../views/ContactAdminView"
import ErrorView from "../views/ErrorView"
import PasswordForgotView from "../views/PasswordForgotView"
import NewPasswordView from "../views/NewPasswordView"
import cookiesStorage from "@/services/cookie";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/connection',
    name: 'connection',
    component: ConnectionView,
    meta: { requiresAuth: true }
  },
  {
    path: '/registration',
    name: 'registration',
    component: RegistrationView,
    meta: { requiresAuth: true }
    
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
    name: 'myAnnouncement',
    component: MyAnnouncements
  },
  {
    path: '/faq',
    name: 'faq',
    component: FaqView
  },
  {
    path: '/legal-information',
    name: 'legal-information',
    component: LegalInformationView
  },
  {
    path: '/contact-us',
    name: 'contact',
    component: ContactAdminView
  },
  {
    path: '/:catchAll(.*)',
    name: 'erreur404',
    component: ErrorView
  },
  {
    path: '/passwordForgot',
    name: 'passwordForgot',
    component: PasswordForgotView
  },
  {
    path: '/newPassword/:id',
    name: 'newPassword',
    component: NewPasswordView
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

router.beforeEach((to, from, next) => {
  // Vérifiez si la route nécessite une authentification
  const token = cookiesStorage.getItem()
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Vérifiez si l'utilisateur est connecté
    if (token) {
      // Si l'utilisateur est connecté, redirigez-le vers la page d'accueil
      next({ name: 'home' });
    } else {
      // Si l'utilisateur n'est pas connecté, laissez-le continuer vers la route requise
      next()
    }
  } else {
    // Si la route ne nécessite pas d'authentification, laissez l'utilisateur continuer
    next()
  }
})

export default router
