<template>
  <header class="bg-light p-3 border-bottom shadow-sm">
    <div class="container ms-1 d-flex justify-content-between align-items-center header-container">
      <!-- Logo -->
      <div class="d-flex align-items-center logo-container">
        <a href="/" class="navbar-brand">
          <i class="fas fa-book"></i> BookBorrow
        </a>
      </div>
      
      <!-- Search Bar -->
      <div class="col-md-4 search-bar">
        <input
          type="text"
          class="form-control"
          placeholder="Search books, authors, genres..."
          v-model="searchQuery"
          @keyup.enter="searchBooks"
        />
      </div>

      
      <!-- Navigation Links -->
      <nav class="nav-links d-none d-md-flex justify-content-center">
        <router-link to="/catalog" class="nav-link">Catalog</router-link>
        <!-- <router-link to="/book" class="nav-link">Sách</router-link> -->
        <router-link to="/borrow-cart" class="nav-link">Favorite</router-link>
        <router-link to="/policy" class="nav-link">Borrow Policy</router-link>
        <router-link to="/profile" class="nav-link">Account</router-link>
        <!-- <router-link to="/checkout" class="nav-link">Phiếu mượn</router-link> -->

      </nav>

      <!-- User Profile -->
   
  <div class="d-flex align-items-center user-cart">
    <!-- User Profile Icon -->
    <div class="dropdown me-4">
      <i class="fas fa-user-circle fa-lg" data-bs-toggle="dropdown" role="button"></i>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        
        <!-- Nếu chưa đăng nhập, chỉ hiển thị "Login" -->
        <template v-if="!isLoggedIn">
          <li>
          <router-link to="/login" class="dropdown-item">Login</router-link>
          </li>
        </template>
        
        <!-- Nếu đã đăng nhập, hiển thị các mục khác -->
        <template v-else>
          <!-- <li v-if="isAdmin"><router-link to="/admin" class="dropdown-item">Admin Dashboard</router-link></li> -->
          <li><router-link to="/profile" class="dropdown-item">Account Settings</router-link></li>
          <!-- <li><router-link to="/UserProfile" class="dropdown-item">Borrow History</router-link></li> -->
          <li><a class="dropdown-item" href="#" @click="logout">Logout</a></li>
        </template>
        
      </ul>
    </div>
  </div>


    </div>
  </header>
</template>


<script>
import apiClient from '../axios.js';
import eventBus  from '@/eventBus.js';
import { jwtDecode } from 'jwt-decode';

export default {
  name: "Header",
  data() {
    return {
      isLoggedIn: false, // Mặc định là chưa đăng nhập
      isAdmin : false,
      searchQuery: '',
    };
  },
   async searchBooks(searchQuery) {
  try {
    console.log('Search books with query:', searchQuery);
    const response = await apiClient.get('/books/getBooksBySearch', {
      params: { query: searchQuery },
    });
    console.log('Books found:', response.data);
    this.books = response.data;
  } catch (error) {
    console.error('Failed to fetch books by search:', error);
  }
},
  mounted() {
     // Lắng nghe sự kiện "loggedIn" để cập nhật trạng thái khi người dùng đăng nhập
    eventBus.on('loggedIn', () => {
      this.isLoggedIn = true;
    });

    // Nếu cần thiết, lắng nghe sự kiện "loggedOut" để cập nhật trạng thái khi người dùng đăng xuất
    eventBus.on('loggedOut', () => {
      this.isLoggedIn = false;
    });
  
  },
  methods: {
  async logout() {
    try {
      // Gọi API để logout
      await apiClient.post('/user/logout', {}, { withCredentials: true });
      this.isLoggedIn = false;
      this.isAdmin = false;
      // Phát sự kiện "loggedOut" để thông báo rằng người dùng đã đăng xuất
      eventBus.emit('loggedOut');    
      // Điều hướng người dùng về trang login hoặc trang chủ
      this.$router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Logout failed. Please try again.');
    }
  },
},
};


</script>

<style scoped>
.header-container {
  gap: 2rem; /* Tạo khoảng cách chung giữa các phần */
}

.logo-container {
  margin-left: 0px; /* Đẩy logo sang trái */
  margin-right: auto;
}

.search-bar {
  flex-grow: 1; /* Cho phép search bar mở rộng */
  margin: 0 1rem; /* Tạo khoảng cách hai bên search bar */
  margin-right: 10rem;
}

.nav-links a {
  margin: 0 0.5rem;
  color: #333;
  padding: 0.5rem 1rem;
  text-decoration: none;
  white-space: nowrap;
  border-radius: 4px; /* Bo tròn nhẹ */
}

.nav-links a:hover {
  color: #fff;
  background-color: #007bff; /* Màu nền khi hover */
}

.user-cart {
  
  display: flex;
  align-items: center;
  gap: 2rem; /* Khoảng cách giữa icon người dùng và giỏ hàng */
}

.cart-icon {
  position: relative;
}

.dropdown-menu li {
  margin-bottom: 8px; /* Tạo khoảng cách dưới giữa các thẻ li */
}
.dropdown-menu li:last-child {
  margin-bottom: 0; /* Loại bỏ khoảng cách dưới cho thẻ li cuối cùng */
}

.ms-1 {
  margin-left: 0.25rem !important;
}

</style>

