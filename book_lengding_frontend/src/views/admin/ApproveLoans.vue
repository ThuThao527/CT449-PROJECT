<template>
  <div class="approve-loans-container">
    <h2>Duyệt Yêu Cầu Mượn Sách</h2>
    <table class="loan-requests-table">
      <thead>
        <tr>
          <th>Tên Sách</th>
          <th>Người Mượn</th>
          <th>Ngày Yêu Cầu</th>
          <th>Ngày Phê Duyệt</th>
          <th>Ngày Hết Hạn</th>
          <th>Ngày Trả Thực Tế</th>
          <th>Tiền Phạt</th>
          <th>Người Xử Lý</th>
          <th>Hành Động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="request in loanRequests" :key="request.id">
          <td>{{ request.bookTitle }}</td>
          <td>{{ request.userName }}</td>
          <td>{{ formatDate(request.requestDate) }}</td>
          <td>{{ formatDate(request.approvalDate) }}</td>
          <td>{{ formatDate(request.dueDate) }}</td>
          <td>{{ formatDate(request.actualReturnDate) }}</td>
          <td>{{ request.fine }}</td>
          <td>{{ request.adminName }}</td>
          <td>
            <button @click="approveLoan(request.id)" v-if="request.status === 'pending'">Duyệt</button>
            <button @click="declineLoan(request.id)" v-if="request.status === 'pending'">Từ Chối</button>
            <span v-if="request.status === 'approved'">Đã duyệt</span>
            <span v-if="request.status === 'rejected'">Đã từ chối</span>
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
        { id: 1, bookTitle: "Sách A", userName: "Người dùng 1", requestDate: '2024-11-01', approvalDate: null, dueDate: '2024-12-01', actualReturnDate: null, fine: 0, adminName: null, status: 'pending' },
        { id: 2, bookTitle: "Sách B", userName: "Người dùng 2", requestDate: '2024-11-02', approvalDate: '2024-11-03', dueDate: '2024-12-02', actualReturnDate: null, fine: 0, adminName: "Admin A", status: 'approved' },
      ],
    };
  },
  methods: {
    approveLoan(id) {
      console.log("Duyệt yêu cầu mượn:", id);
      // Gọi API để duyệt yêu cầu
    },
    declineLoan(id) {
      console.log("Từ chối yêu cầu mượn:", id);
      // Gọi API để từ chối yêu cầu
    },
    formatDate(date) {
      if (!date) return "Chưa có";
      const d = new Date(date);
      return d.toLocaleDateString();
    },
  },
};
</script>

<style scoped>
.approve-loans-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
}
.loan-requests-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}
.loan-requests-table th,
.loan-requests-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}
.loan-requests-table th {
  background-color: #f2f2f2;
  font-weight: bold;
}
button {
  padding: 5px 10px;
  margin: 5px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  opacity: 0.8;
}
button:first-of-type {
  background-color: #28a745;
  color: white;
}
button:last-of-type {
  background-color: #dc3545;
  color: white;
}
</style>
