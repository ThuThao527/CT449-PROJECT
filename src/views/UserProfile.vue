<template>
  <div class="user-profile container py-5">
    <h2>User Profile</h2>

    <!-- User Information -->
    <section class="user-info mb-4">
      <h3>User Information</h3>
      <p><strong>Name:</strong> {{ user.name }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <button class="btn btn-secondary" @click="editUserInfo">Edit Information</button>
    </section>

    <!-- Borrow History -->
    <section class="borrow-history mb-4">
      <h3>Borrow History</h3>
      <table class="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Borrow Date</th>
            <th>Return Date</th>
            <th>Rating / Review</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="history in borrowHistory" :key="history.id">
            <td>{{ history.title }}</td>
            <td>{{ history.author }}</td>
            <td>{{ history.borrowDate }}</td>
            <td>{{ history.returnDate }}</td>
            <td>
              <input type="number" v-model="history.rating" min="1" max="5" class="form-control d-inline-block w-25" />
              <button class="btn btn-primary btn-sm ms-2" @click="submitReview(history)">Submit</button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>

    <!-- Currently Borrowed Books -->
    <section class="currently-borrowed">
      <h3>Currently Borrowed</h3>
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
          <tr v-for="book in currentlyBorrowed" :key="book.id">
            <td>{{ book.title }}</td>
            <td>{{ book.author }}</td>
            <td>{{ book.dueDate }}</td>
            <td>
              <button class="btn btn-warning btn-sm" @click="renewBook(book)">Renew</button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script>
export default {
  name: "UserProfile",
  data() {
    return {
      // Dữ liệu giả về thông tin người dùng
      user: {
        name: "John Doe",
        email: "johndoe@example.com"
      },
      // Dữ liệu giả về lịch sử mượn sách
      borrowHistory: [
        { id: 1, title: "Book Title 1", author: "Author 1", borrowDate: "2023-01-01", returnDate: "2023-01-15", rating: 5 },
        { id: 2, title: "Book Title 2", author: "Author 2", borrowDate: "2023-02-01", returnDate: "2023-02-15", rating: 4 }
      ],
      // Dữ liệu giả về sách hiện đang mượn
      currentlyBorrowed: [
        { id: 3, title: "Book Title 3", author: "Author 3", dueDate: "2023-12-01" },
        { id: 4, title: "Book Title 4", author: "Author 4", dueDate: "2023-12-15" }
      ]
    };
  },
  methods: {
    // Hàm chỉnh sửa thông tin người dùng
    editUserInfo() {
      console.log("Edit user information");
      // Thêm logic chỉnh sửa thông tin người dùng ở đây
    },
    // Hàm gửi đánh giá
    submitReview(history) {
      console.log("Submitted review for:", history.title, "with rating:", history.rating);
      // Thêm logic gửi đánh giá ở đây
    },
    // Hàm gia hạn sách
    renewBook(book) {
      console.log("Renewed book:", book.title);
      // Thêm logic gia hạn sách ở đây
    }
  }
};
</script>

<style scoped>
.user-profile {
  max-width: 800px;
  margin: auto;
}
</style>
