<template>
  <div v-if="book" class="book-detail-container p-4">
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
      <h4>Borrow Book Form </h4>
       <div class="borrow-book-info">
        <h5>{{ book.title }}</h5>
        <p><strong>Author:</strong> {{ book.author }}</p>
        <p><strong>Genre:</strong> {{ book.genre.join(', ') }}</p>
      </div>
      <form @submit.prevent="borrowBook">
        <div class="form-group">
          <label for="idStudent">Your id Student</label>
          <input type="text" v-model="idStudent" id="idStudent" required />
        </div>
        <div class="form-group">
          <label for="borrowDate">Borrow Date</label>
          <input type="date" v-model="borrowDate" id="borrowDate" required />
        </div>
        <div class="form-group">
          <label for="note">Additional Note</label>
          <textarea v-model="note" id="note" placeholder="Any additional request"></textarea>
        </div>
        <button type="submit" class="btn btn-success">Submit Borrow Request</button>
        <button type="button" class="btn btn-secondary" @click="cancelBorrowForm">Cancel</button>
      </form>
    </div>
  </div>
  <div v-else>
    <p>Loading book details...</p>
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
      idStudent: '',
      borrowDate: '',
      note: '',
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
        this.book.coverImage = `${baseURL}${this.book.images[0].replace(/\\/g, '/')}`;
      } else {
        this.book.coverImage = ''; // Để tránh lỗi nếu không có hình ảnh nào
      }

      // Kiểm tra lại URL hình ảnh sau khi xử lý
      console.log('Cover Image URL:', this.book.coverImage);
    } catch (error) {
      console.error('Failed to fetch book details:', error);
    }
  },
  openBorrowForm(){
    this.showBorrowForm = true;
  },
  cancelBorrowForm(){
    console.log("Cancel borrow form clicked");
    this.showBorrowForm = false;
  },
    async borrowBook() {
    console.log("Borrow book clicked");
    try {
      const requestData = {
        bookId: this.book._id,
        idStudent: this.idStudent, 
        borrowDate: this.borrowDate,
        note: this.note,
      };
      const response = await apiClient.post('/books/createBorrowRequest', requestData);
      if (response.status === 200) {
        alert('Borrow request submitted successfully!');
        this.showBorrowForm = false;
      }
    } catch (error) {
      console.error('Failed to submit borrow request:', error);
      alert('There was an error processing your request. Please try again later.');
    }
  }

},
  mounted() {
    console.log("Mounted BookDetail.vue");
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
  height: auto;
  width: 250px;  
  object-fit: contain; 
  object-position: center; 
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
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
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.borrow-form .form-group {
  margin-bottom: 15px;
}

.borrow-form label {
  font-weight: bold;
}

.borrow-form input, .borrow-form textarea {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
}

.borrow-form button {
  margin-right: 10px;
}
</style>
