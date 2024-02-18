import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../components/LandingPage.vue'
import HomePage from '../components/HomePage.vue'
import SeriesPage from '../components/SeriesPage.vue'
import RegisterPage from '../components/RegisterPage.vue'
import LoginPage from '../components/LoginPage.vue'
import VerifyPage from '../components/VerifyPage.vue'
import ForgotPassPage from '../components/ForgotPassPage.vue'
import ResetPasswordPage from '../components/ResetPasswordPage.vue'

const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage
  },
  {
    path: '/home',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/series',
    name: 'SeriesPage',
    component: SeriesPage
  },
  {
    path: '/register',
    name: 'Register Page',
    component: RegisterPage
  },
  {
    path: '/login',
    name: 'Login Page',
    component: LoginPage
  },
  {
    path: '/verify',
    name: 'Verify Page',
    component: VerifyPage
  },
  {
    path: '/forgot-password',
    name: 'Forgot Password Page',
    component: ForgotPassPage
  },
  {
    path: '/reset-password',
    name: 'Reset Password Page',
    component: ResetPasswordPage
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
