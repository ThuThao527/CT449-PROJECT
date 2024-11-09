<!-- views/admin/ApproveLoans.vue -->
<template>
  <div>
    <h2>Duyệt Yêu Cầu Mượn Sách</h2>
    <table>
      <thead>
        <tr>
          <th>Tên Sách</th>
          <th>Người Mượn</th>
          <th>Hành Động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="request in loanRequests" :key="request.id">
          <td>{{ request.bookTitle }}</td>
          <td>{{ request.userName }}</td>
          <td>
            <button @click="approveLoan(request.id)">Duyệt</button>
            <button @click="declineLoan(request.id)">Từ Chối</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loanRequests: [
        // Dữ liệu mẫu - cần thay thế bằng dữ liệu thực từ API
        { id: 1, bookTitle: "Sách A", userName: "Người dùng 1" },
        { id: 2, bookTitle: "Sách B", userName: "Người dùng 2" },
      ],
    };
  },
  methods: {
    approveLoan(id) {
      console.log("Duyệt yêu cầu mượn:", id);
    },
    declineLoan(id) {
      console.log("Từ chối yêu cầu mượn:", id);
    },
  },
};
</script>
