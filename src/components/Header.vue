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
        <input type="text" class="form-control" placeholder="Search books, authors, genres..." />
      </div>
      
      <!-- Navigation Links -->
      <nav class="nav-links d-none d-md-flex justify-content-center ">
        <a href="#" class="nav-link">Thể loại</a>
        <a href="#" class="nav-link">Phổ biến</a>
        <a href="#" class="nav-link">Mới</a>
        <a href="#" class="nav-link">Tài khoản</a>
        <a href="#" class="nav-link">Trợ giúp</a>
      </nav>

      <!-- User Profile and Borrow Cart -->
      <div class="d-flex align-items-center user-cart">
        <!-- User Profile Icon -->
        <div class="dropdown me-4">
          <i class="fas fa-user-circle fa-lg" data-bs-toggle="dropdown" role="button"></i>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li><a class="dropdown-item" href="#">Login</a></li>
            <li><a class="dropdown-item" href="#">Account Settings</a></li>
            <li><a class="dropdown-item" href="#">Borrow History</a></li>
            <li><a class="dropdown-item" href="#">Logout</a></li>
          </ul>
        </div>
        
        <!-- Borrow Cart -->
        <a href="#" class="position-relative cart-icon">
          <i class="fas fa-shopping-cart fa-lg"></i>
          <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            3 <!-- Số lượng sách trong giỏ mượn -->
          </span>
        </a>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
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
  margin: 0 0.5rem; /* Tạo khoảng cách giữa các link */
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

