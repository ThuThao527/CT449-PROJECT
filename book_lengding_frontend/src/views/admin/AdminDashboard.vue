<!-- views/admin/AdminDashboard.vue -->
<template>
  <div>
    <h1>Admin Dashboard</h1>
    <nav>
      <router-link to="/admin/approve-loans">Duyệt Yêu Cầu Mượn Sách</router-link>
      <router-link to="/admin/add-book">Thêm Sách</router-link>
      <router-link to="/admin/user-accounts">Xem Danh Sách Tài Khoản</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "AdminDashboard",
};
</script>
