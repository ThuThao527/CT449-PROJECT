// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import { jwtDecode } from 'jwt-decode';
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

function isAuthenticated() {
  return !!localStorage.getItem('token'); // Kiểm tra token trong localStorage
}

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/catalog', name: 'Catalog', component: CatalogPage },
  { path: '/books/:id', name: 'BookDetail', component: BookDetails,},
  { path: '/borrow-cart', name: 'BorrowCart', component: BorrowCart, meta: { requiresAuth: true} },
  { path: '/profile', name: 'UserProfile', component: UserProfile, meta: { requiresAuth: true} },
  { path: '/checkout', name: 'Checkout', component: Checkout, meta: { requiresAuth: true} },
  { path: '/admin/approve-loans', component: ApproveLoans, name: 'ApproveLoans', meta: { requiresAuth: true, requiresAdmin: true }},
  { path: '/admin/add-book', component: AddBook, name: 'AddBook', meta: { requiresAuth: true } },
  { path: '/admin/user-accounts', component: UserAccounts, name: 'UserAccounts', meta: { requiresAuth: true, requiresAdmin: true } },
  { path: '/admin', component: AdminDashboard, name: 'AdminDashboard', meta: { requiresAuth: true, requiresAdmin: true }},
  { path: '/policy', name: 'Policy',component: Policy, name : 'Policy'},
  { path: '/login', component: AuthForm, name: 'Login' },
  { path: '/register', component: AuthForm, name : ' register' },
  { path: '/verify-otp', component: AuthForm, name : ' verify'}
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!token) {
      // Nếu route cần xác thực và không có token, điều hướng đến login
      return next('/login');
    } else {
      // Nếu có token, giải mã token để kiểm tra role
      const decodedToken = jwtDecode(token);
      const userRole = decodedToken.role;

      if (to.matched.some(record => record.meta.requiresAdmin) && userRole !== 'Admin') {
        // Nếu route yêu cầu quyền admin và người dùng không phải admin, điều hướng về trang chủ
        return next('/homepage');
      }
    }
  }

  next(); // Nếu không cần xác thực hoặc đã xác thực thành công, cho phép tiếp tục
});


export default router;
