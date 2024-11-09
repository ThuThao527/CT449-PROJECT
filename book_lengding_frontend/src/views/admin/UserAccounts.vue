<!-- views/admin/UserAccounts.vue -->
<template>
  <div>
    <h2>Danh Sách Tài Khoản Người Dùng</h2>
    <table>
      <thead>
        <tr>
          <th>Tên</th>
          <th>Email</th>
          <th>Trạng Thái</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.status }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [
        // Dữ liệu mẫu - cần thay thế bằng dữ liệu thực từ API
        { id: 1, name: "Người dùng 1", email: "user1@example.com", status: "Active" },
        { id: 2, name: "Người dùng 2", email: "user2@example.com", status: "Inactive" },
      ],
    };
  },
};
</script>
