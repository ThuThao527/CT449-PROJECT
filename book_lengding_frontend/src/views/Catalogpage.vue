<template>
  <div class="catalog-page d-flex">
    <!-- Filter Sidebar -->
    <aside class="filter-sidebar p-4">
      <h4 class="filter-title mb-4">Filter Books</h4>
      <div class="mb-3">
        <label>Genre</label>
        <select class="form-select" v-model="selectedGenre" @change="fetchBooks">
          <option value="">All Genres</option>
          <option v-for="genre in genres" :key="genre.id" :value="genre.name">{{ genre.name }}</option>
        </select>
      </div>
      <div class="mb-3">
        <label>Language</label>
        <select class="form-select" v-model="selectedLanguage" @change="fetchBooks">
          <option value="">All Languages</option>
          <option v-for="language in languages" :key="language.id" :value="language.name">{{ language.name }}</option>
        </select>
      </div>
      <div class="mb-3">
        <label>Publication Date</label>
        <input type="date" class="form-control" v-model="publicationDate" @change="fetchBooks">
      </div>
      <div class="mb-3">
        <label>Author</label>
        <input type="text" class="form-control" placeholder="Search by author" v-model="authorSearch" @input="fetchBooks">
      </div>
      <div class="mb-3">
        <label>Sort By</label>
        <select class="form-select" v-model="sortBy" @change="fetchBooks">
          <option value="popularity">Popularity</option>
          <option value="latest">Latest</option>
          <option value="rating">Rating</option>
        </select>
      </div>
    </aside>

    <!-- Book List -->
    <main class="book-list flex-grow-1 p-4">
      <div class="row g-4">
        <!-- Book Card -->
        <div v-for="book in books" :key="book.id" class="col-md-4">
          <div class="card h-100 book-card" @click="goToBookDetail(book._id)">
            <!-- Sử dụng coverImage cho hình ảnh sách -->
            <img :src="book.coverImage" class="card-img-top" :alt="book.title">
            <div class="card-body">
              <h5 class="card-title">{{ book.title }}</h5>
              <p class="card-author text-muted">Author: {{ book.author }}</p>
              <p class="card-genre">Genre: {{ book.genre.join(', ') }}</p>
              <p class="card-availability" :class="book.availability === 'Available' ? 'text-success' : 'text-danger'">
                {{ book.availability }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import apiClient from '@/axios'; // Đã cấu hình sẵn axios với API base URL

export default {
  name: 'CatalogPage',
  data() {
    return {
      books: [],      // Chứa danh sách các sách
      genres: [],     // Chứa danh sách thể loại lấy từ API
      languages: [],  // Chứa danh sách ngôn ngữ lấy từ API
      selectedGenre: '',
      selectedLanguage: '',
      publicationDate: '',
      authorSearch: '',
      sortBy: 'popularity'
    };
  },
  methods: {
    // Phương thức để lấy toàn bộ sách mà không áp dụng bộ lọc
    async fetchBooks() {
      try {
        const params = {};

        // Áp dụng bộ lọc chỉ khi người dùng chọn
        if (this.selectedGenre) params.genre = this.selectedGenre;
        if (this.selectedLanguage) params.language = this.selectedLanguage;
        if (this.authorSearch) params.author = this.authorSearch;
        if (this.sortBy) params.sortBy = this.sortBy;

        const response = await apiClient.get('/books/getAll', { params });
        console.log(response.data);
        const books = response.data.map(book => {
          // Xử lý đường dẫn ảnh để thành đường dẫn đầy đủ
      const baseURL = 'http://localhost:5000'; // Đảm bảo đúng với server của bạn

      // Thêm baseURL vào các ảnh trong mảng images
      book.images = book.images.map(image => {
        // Nếu chưa có baseURL, thêm vào
        return image.startsWith(baseURL) ? image : `${baseURL}${image}`;
      });
      
      // Đặt coverImage là ảnh đầu tiên nếu có
      book.coverImage = book.images.length > 0 ? book.images[0] : '';
      return book;
        });
        this.books = books;
         this.books.forEach(book => {
            console.log('Cover Image URL:', book.images);
          });
      } catch (error) {
        console.error('Failed to fetch books:', error);
      }
    },
    // Lấy danh sách thể loại từ server
    async fetchGenres() {
      try {
        const response = await apiClient.get('/api/genres');
        this.genres = response.data;
      } catch (error) {
        console.error('Failed to load genres:', error);
      }
    },
    // Lấy danh sách ngôn ngữ từ server
    async fetchLanguages() {
      try {
        const response = await apiClient.get('/api/languages');
        this.languages = response.data;
      } catch (error) {
        console.error('Failed to load languages:', error);
      }
    },
    // Điều hướng đến trang chi tiết sách
    goToBookDetail(bookId) {
    this.$router.push({ name: 'BookDetail', params: { id: bookId } });
  },
  },
  mounted() {
    // Khi trang catalog được tải, lấy toàn bộ sách và thể loại, ngôn ngữ để hiển thị ngay lập tức
    this.fetchBooks();     // Lấy toàn bộ sách không qua bộ lọc
    this.fetchGenres();    // Lấy danh sách thể loại
    this.fetchLanguages(); // Lấy danh sách ngôn ngữ
    console.log(this.books);
  }
};
</script>

<style scoped>
/* CSS như đã giải thích trước đây để làm đẹp hơn */
.catalog-page {
  display: flex;
  background-color: #f4f4f4;
}

.filter-sidebar {
  width: 280px;
  background-color: #ffffff;
  border-right: 1px solid #dee2e6;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.filter-title {
  color: #343a40;
  font-weight: bold;
}

.filter-sidebar select,
.filter-sidebar input {
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ced4da;
}

.book-list {
  flex-grow: 1;
}

.book-card {
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.book-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
}

.card-img-top {
  height: 250px; /* Chiều cao có thể thay đổi tùy vào yêu cầu */
  width: 100%;   /* Đảm bảo rằng ảnh chiếm toàn bộ chiều rộng của card */
  object-fit: contain; /* Thay đổi từ cover sang contain nếu muốn giữ nguyên tỷ lệ */
  object-position: center; /* Đảm bảo hình ảnh được căn giữa */
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}


.card-body {
  padding: 15px;
}

.card-title {
  font-size: 1.25rem;
  font-weight: bold;
  color: #007bff;
}

.card-author {
  font-size: 0.9rem;
  color: #6c757d;
}

.card-genre {
  font-size: 0.9rem;
  margin-bottom: 10px;
  color: #343a40;
}

.card-availability {
  font-size: 0.9rem;
}

.text-success {
  font-weight: bold;
}

.text-danger {
  font-weight: bold;
}
</style>
