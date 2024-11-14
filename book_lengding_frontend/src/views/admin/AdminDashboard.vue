<template>
  <div class="container mt-4">
    <!-- Header -->
    <div class="jumbotron text-center bg-primary text-white py-4 rounded">
      <h1 class="display-4">Admin Dashboard</h1>
      <p class="lead">Quản lý yêu cầu mượn sách, thêm sách mới, và quản lý tài khoản người dùng</p>
    </div>

    <!-- Navigation Cards -->
    <div class="row mt-5">
      <!-- Duyệt Yêu Cầu Mượn Sách -->
      <div class="col-md-4 mb-4">
        <div class="card h-100 text-center shadow-sm">
          <div class="card-body">
            <h5 class="card-title">Duyệt Yêu Cầu Mượn Sách</h5>
            <p class="card-text">
              Xem và duyệt các yêu cầu mượn sách từ người dùng.
            </p>
            <router-link to="/admin/approve-loans" class="btn btn-primary">Duyệt Yêu Cầu</router-link>
          </div>
        </div>
      </div>

      <!-- Thêm Sách -->
      <div class="col-md-4 mb-4">
        <div class="card h-100 text-center shadow-sm">
          <div class="card-body">
            <h5 class="card-title">Thêm Sách Mới</h5>
            <p class="card-text">
              Thêm các cuốn sách mới vào hệ thống thư viện.
            </p>
            <router-link to="/admin/add-book" class="btn btn-success">Thêm Sách</router-link>
          </div>
        </div>
      </div>

      <!-- Xem Danh Sách Tài Khoản -->
      <div class="col-md-4 mb-4">
        <div class="card h-100 text-center shadow-sm">
          <div class="card-body">
            <h5 class="card-title">Xem Danh Sách Tài Khoản</h5>
            <p class="card-text">
              Quản lý các tài khoản người dùng trong hệ thống.
            </p>
            <router-link to="/admin/user-accounts" class="btn btn-info">Xem Tài Khoản</router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content (Router View) -->
    <div class="mt-5">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminDashboard",
};
</script>

<style scoped>
.card {
  transition: transform 0.3s ease-in-out;
}

.card:hover {
  transform: scale(1.05);
}

.jumbotron {
  background-color: #007bff;
}
</style>
