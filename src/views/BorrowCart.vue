<template>
  <div class="borrow-cart container py-5">
    <h2>Borrow Cart</h2>
    <p v-if="books.length === 0">Your borrow cart is empty.</p>

    <!-- List of Books to Borrow -->
    <div v-else>
      <table class="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Due Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="book in books" :key="book.id">
            <td>{{ book.title }}</td>
            <td>{{ book.author }}</td>
            <td>
              <input type="date" v-model="book.dueDate" class="form-control" />
            </td>
            <td>
              <button @click="removeBook(book.id)" class="btn btn-danger btn-sm">Remove</button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Confirm Borrow Button -->
      <button class="btn btn-primary mt-3" @click="confirmBorrow">
        Confirm Borrow
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "BorrowCart",
  data() {
    return {
      // Dữ liệu giả cho các sách đã chọn để mượn
      books: [
        { id: 1, title: "Book Title 1", author: "Author 1", dueDate: "2023-11-01" },
        { id: 2, title: "Book Title 2", author: "Author 2", dueDate: "2023-11-02" },
        // Thêm sách nếu cần
      ],
    };
  },
  methods: {
    // Xóa sách khỏi giỏ mượn
    removeBook(bookId) {
      this.books = this.books.filter(book => book.id !== bookId);
    },
    // Xác nhận mượn sách và chuyển đến trang thanh toán
    confirmBorrow() {
      // Chuyển hướng đến trang thanh toán hoặc thực hiện hành động khác
      console.log("Borrow confirmed:", this.books);
      this.$router.push("/checkout"); // Giả sử bạn có trang checkout
    },
  },
};
</script>

<style scoped>
.borrow-cart {
  max-width: 800px;
  margin: auto;
}

table {
  width: 100%;
}
</style>
