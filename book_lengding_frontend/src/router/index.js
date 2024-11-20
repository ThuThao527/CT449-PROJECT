import axios from 'axios';
import apiClient from '@/axios'; 
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
import Policy from '@/views/Policy.vue';

const routes = [
  { path: '/', redirect: '/homepage' },
  { path: '/homepage', name: 'Home', component: HomePage },
  { path: '/catalog', name: 'Catalog', component: CatalogPage  },
  { path: '/books/:id', name: 'BookDetail', component: BookDetails, meta: { requiresAuth: true } },
  { path: '/borrow-cart', name: 'BorrowCart', component: BorrowCart, meta: { requiresAuth: true } },
  { path: '/profile', name: 'UserProfile', component: UserProfile, meta: { requiresAuth: true } },
  { path: '/checkout', name: 'Checkout', component: Checkout, meta: { requiresAuth: true } },
  { path: '/admin/approve-loans', component: ApproveLoans, name: 'ApproveLoans', meta: { requiresAuth: true, requiresAdmin: true } },
  { path: '/admin/add-book', component: AddBook, name: 'AddBook', meta: { requiresAuth: true, requiresAdmin: true } },
  { path: '/admin/user-accounts', component: UserAccounts, name: 'UserAccounts', meta: { requiresAuth: true, requiresAdmin: true } },
  { path: '/admin', component: AdminDashboard, name: 'AdminDashboard', meta: { requiresAuth: true, requiresAdmin: true } },
  { path: '/policy', name: 'Policy', component: Policy },
  { path: '/login', component: AuthForm, name: 'Login' },
  { path: '/register', component: AuthForm, name: 'Register' },
  { path: '/verify-otp', component: AuthForm, name: 'Verify' }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  // Kiểm tra xem người dùng có phiên làm việc hay không (dựa vào cookie session)
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Nếu route yêu cầu xác thực và không có session, điều hướng đến login
    apiClient.get('/user/check-session')
      .then(response => {
        const userRole = response.data.role;

        // Nếu route yêu cầu quyền admin và người dùng không phải admin, chuyển đến homepage
        if (to.matched.some(record => record.meta.requiresAdmin)) {
          if (userRole !== 'Admin') {
            return next('/homepage');
          } else {
            // Nếu người dùng là admin, cho phép tiếp tục
            return next();
          }
        }

        // Nếu người dùng là admin và đăng nhập thành công, điều hướng đến trang admin
        if (userRole === 'Admin' && to.path === '/admin') {
          return next();
        } else if (userRole === 'Admin' && to.path !== '/admin') {
          return next('/admin');
        }

        // Nếu người dùng là người thường, cho phép tiếp tục đến các trang khác
        next();
      })
      .catch(() => next('/login'));
  } else {
    next(); // Nếu route không yêu cầu xác thực, cho phép tiếp tục
  }
});

export default router;
