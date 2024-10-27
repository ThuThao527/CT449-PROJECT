// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';

import HomePage from '@/views/Homepage.vue';
import CatalogPage from '@/views/Catalogpage.vue';
import BookDetails from '@/views/BookDetails.vue';
import BorrowCart from '@/views/BorrowCart.vue';
import UserProfile from '@/views/UserProfile.vue';
import Checkout from '@/views/Checkout.vue';
//import AboutPage from '@/views/AboutPage.vue';

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/catalog', name: 'Catalog', component: CatalogPage },
  {path: '/book/:id', name:'bookDetails', component: BookDetails},
  { path: '/borrow-cart', name: 'BorrowCart', component: BorrowCart },
  { path: '/profile', name: 'UserProfile', component: UserProfile },
  { path: '/checkout', name: 'Checkout', component: Checkout }
  //{ path: '/about', name: 'About', component: AboutPage }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
