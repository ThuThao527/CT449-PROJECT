// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';

import HomePage from '@/views/Homepage.vue';
import CatalogPage from '@/views/Catalogpage.vue';
import BookDetails from '@/views/BookDetails.vue';
import BorrowCart from '@/views/BorrowCart.vue';
import UserProfile from '@/views/UserProfile.vue';
import Checkout from '@/views/Checkout.vue';

import AdminDashboard from '@/views/admin/AdminDashboard.vue';
import ApproveLoans from '@/views/admin/ApproveLoans.vue';
import AddBook from '@/views/admin/AddBook.vue';
import UserAccounts from '@/views/admin/UserAccounts.vue';
import AuthForm from '@/views/AuthForm.vue';

function isAuthenticated() {
  return !!localStorage.getItem('token'); // Kiểm tra token trong localStorage
}

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/catalog', name: 'Catalog', component: CatalogPage },
  {path: '/book/:id', name:'bookDetails', component: BookDetails},
  { path: '/borrow-cart', name: 'BorrowCart', component: BorrowCart },
  { path: '/profile', name: 'UserProfile', component: UserProfile },
  { path: '/checkout', name: 'Checkout', component: Checkout },
  //{ path: '/about', name: 'About', component: AboutPage }
  // Routes cho admin
  { path: '/admin', component: AdminDashboard, name: 'AdminDashboard' },
  { path: '/admin/approve-loans', component: ApproveLoans, name: 'ApproveLoans' },
  { path: '/admin/add-book', component: AddBook, name: 'AddBook' },
  { path: '/admin/user-accounts', component: UserAccounts, name: 'UserAccounts' },
  { path: '/admin', component: AdminDashboard,  meta: { requiresAuth: true },},

  { path: '/login', component: AuthForm },
  { path: '/register', component: AuthForm },
  // { path: '/forgot-password', component: () => import('./views/ForgotPassword.vue') }, 

];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next('/login');
  } else {
    next();
  }
});

export default router;
