<template>
  <div class="container mt-4">
    <!-- Header -->
    <div class="jumbotron text-center bg-primary text-white py-4 rounded">
      <h1 class="display-4">Admin Dashboard</h1>
      <p class="lead">Manage book borrowing requests, add new books, and manage user accounts</p>
    </div>

    <!-- Navigation Cards -->
    <div class="row mt-5">
      <!-- Duyệt Yêu Cầu Mượn Sách -->
      <div class="col-md-4 mb-4">
        <div class="card h-100 text-center shadow-sm">
          <div class="card-body">
            <h5 class="card-title">Approve Book Borrowing Requests</h5>
            <p class="card-text">
              View and approve book borrowing requests from users.
            </p>
            <router-link to="/admin/approve-loans" class="btn btn-primary">View requests</router-link>
          </div>
        </div>
      </div>

      <!-- Thêm Sách -->
      <div class="col-md-4 mb-4">
        <div class="card h-100 text-center shadow-sm">
          <div class="card-body">
            <h5 class="card-title">Manage books</h5>
            <p class="card-text">
              Add new books to the library system or delete book.
            </p>
            <router-link to="/admin/add-book" class="btn btn-success">Add books</router-link>
          </div>
        </div>
      </div>

      <!-- Xem Danh Sách Tài Khoản -->
      <div class="col-md-4 mb-4">
        <div class="card h-100 text-center shadow-sm">
          <div class="card-body">
            <h5 class="card-title">View User Account List</h5>
            <p class="card-text">
              Manage user accounts in the system.
            </p>
            <router-link to="/admin/user-accounts" class="btn btn-info">View accounts</router-link>
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
