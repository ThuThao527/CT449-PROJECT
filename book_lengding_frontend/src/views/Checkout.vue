<template>
  <div class="checkout-page container py-5">
    <h2>Borrowing Summary</h2>
    
    <!-- Borrowing Summary Table -->
    <table class="table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Due Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="book in booksToBorrow" :key="book.id">
          <td>{{ book.title }}</td>
          <td>{{ book.author }}</td>
          <td>{{ book.dueDate }}</td>
        </tr>
      </tbody>
    </table>

    <!-- Confirmation Button -->
    <button class="btn btn-primary btn-lg mt-4" @click="confirmBorrow">
      Confirm Borrow
    </button>

    <!-- Thank You Message (Hiển thị sau khi xác nhận) -->
    <div v-if="showThankYouMessage" class="thank-you mt-5 text-center">
      <h3>Thank you for borrowing with us!</h3>
      <p>Your books have been successfully borrowed.</p>
      <router-link to="/profile" class="btn btn-secondary mt-3">View Borrowed Books</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Checkout",
  data() {
    return {
      // Danh sách sách được chọn để mượn
      booksToBorrow: [
        { id: 1, title: "Book Title 1", author: "Author 1", dueDate: "2023-11-01" },
        { id: 2, title: "Book Title 2", author: "Author 2", dueDate: "2023-11-02" }
        // Thêm sách nếu cần
      ],
      showThankYouMessage: false // Trạng thái để hiển thị trang Thank You sau khi xác nhận
    };
  },
  methods: {
    // Xác nhận mượn sách và hiển thị trang Thank You
    confirmBorrow() {
      // Thực hiện logic xác nhận mượn sách
      console.log("Borrow confirmed for:", this.booksToBorrow);
      
      // Hiển thị thông báo cảm ơn
      this.showThankYouMessage = true;
      
      // Reset lại giỏ mượn sách hoặc cập nhật dữ liệu nếu cần thiết
    }
  }
};
</script>

<style scoped>
.checkout-page {
  max-width: 800px;
  margin: auto;
}

.thank-you h3 {
  color: green;
}

.table {
  margin-top: 20px;
}
</style>
