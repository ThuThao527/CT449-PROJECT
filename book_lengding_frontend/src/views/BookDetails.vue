<template>
  <div class="book-detail-container p-4">
    <div class="book-detail-card">
      <img :src="book.coverImage" class="book-cover-image" :alt="book.title">
      <div class="book-info">
        <h2>{{ book.title }}</h2>
        <p><strong>Author:</strong> {{ book.author }}</p>
        <p><strong>Genre:</strong> {{ book.genre.join(', ') }}</p>
        <p><strong>Language:</strong> {{ book.language }}</p>
        <p><strong>Publication Date:</strong> {{ formattedPublicationDate }}</p>
        <p><strong>Available Copies:</strong> {{ book.availableCopies }}</p>
        <p><strong>Status:</strong> {{ book.status }}</p>
        <p><strong>Description:</strong> {{ book.description }}</p>
        <div class="borrow-button-container">
          <button class="btn btn-primary" @click="openBorrowForm">Borrow Book</button>
        </div>
      </div>
    </div>
    
    <!-- Form Mượn Sách -->
    <div v-if="showBorrowForm" class="borrow-form">
      <h4>Borrow Book</h4>
      <form @submit.prevent="borrowBook">
        <div class="form-group">
          <label for="borrowerName">Your Name</label>
          <input type="text" v-model="borrowerName" id="borrowerName" required />
        </div>
        <button type="submit" class="btn btn-success">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import apiClient from '@/axios';

export default {
  name: 'BookDetail',
  data() {
    return {
      book: null,
      showBorrowForm: false,
      borrowerName: '',
    };
  },
  computed: {
    formattedPublicationDate() {
      if (this.book && this.book.publicationDate) {
        return new Date(this.book.publicationDate).toLocaleDateString();
      }
      return 'Unknown';
    }
  },
 methods: {
  async fetchBookDetails() {
    console.log("fetchBookDetails method called");
    try {
      const response = await apiClient.get(`/books/${this.$route.params.id}`);
      console.log("API response:", response);

      // Gán dữ liệu sách từ phản hồi API
      this.book = response.data;

      // Kiểm tra lại dữ liệu sách sau khi nhận từ API
      console.log("Fetched Book:", this.book);

      // Xử lý cover image với đường dẫn đầy đủ
      const baseURL = 'http://localhost:5000'; // Địa chỉ của server
      if (this.book.images && this.book.images.length > 0) {
        this.book.coverImage = `${baseURL}/${this.book.images[0].replace(/\\/g, '/')}`;
      } else {
        this.book.coverImage = ''; // Để tránh lỗi nếu không có hình ảnh nào
      }

      // Kiểm tra lại URL hình ảnh sau khi xử lý
      console.log('Cover Image URL:', this.book.coverImage);
    } catch (error) {
      console.error('Failed to fetch book details:', error);
    }
  },
},
  mounted() {
    console.log("Mounted BookDetail.vue");
    debugger;
    this.fetchBookDetails();
  }
};
</script>

<style scoped>
.book-detail-container {
  max-width: 800px;
  margin: 0 auto;
}

.book-detail-card {
  display: flex;
  gap: 20px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.book-cover-image {
  width: 200px;
  height: auto;
  object-fit: cover;
  border-radius: 4px;
}

.book-info {
  flex-grow: 1;
}

.borrow-button-container {
  margin-top: 20px;
}

.borrow-form {
  margin-top: 40px;
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
}

.borrow-form .form-group {
  margin-bottom: 15px;
}

.borrow-form label {
  font-weight: bold;
}
</style>
