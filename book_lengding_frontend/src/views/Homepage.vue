<template>
  <div id="home-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <img src="/image/banner.jpg" alt="Banner" class="hero-banner" />
      <div class="hero-content">
        <h1>Chào mừng đến với Thư viện của chúng tôi</h1>
        <p>Khám phá hàng ngàn quyển sách, truyện và nhiều hơn nữa.</p>
        <router-link to="/catalog" class="cta-button">Khám phá ngay</router-link>
      </div>
    </section>
    <!-- Featured Books -->
    <section class="featured-books">
      <h2>Sách Nổi Bật</h2>
      <div class="book-list">
        <div v-for="book in featuredBooks" :key="book._id" class="book-card" @click="goToBookDetail(book._id)">
          <img :src="book.coverImage" class="book-image" :alt="book.title" />
          <div class="book-info">
            <h3>{{ book.title }}</h3>
            <p class="book-author">Tác giả: {{ book.author }}</p>
            <router-link :to="`/books/${book._id}`" class="view-button">
            Xem chi tiết
          </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Genres -->
    <section class="genres-section">
      <h2>Thể loại sách</h2>
      <div class="genres-list">
        <div
          v-for="genre in genres"
          :key="genre"
          class="genre-card"
        >
          <router-link :to="`/catalog?genre=${genre}`">{{ genre }}</router-link>
        </div>
      </div>
    </section>

    <!-- Recommended Books -->
    <section class="recommended-books">
      <h2>Sách Gợi Ý</h2>
      <div class="book-list">
        <div v-for="book in recommendedBooks" :key="book._id" class="book-card" @click="goToBookDetail(book._id)">
          <img :src="book.coverImage" class="book-image" :alt="book.title" />
          <div class="book-info">
            <h3>{{ book.title }}</h3>
            <p class="book-author">Tác giả: {{ book.author }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="testimonials">
      <Testimonials />
    </section>
  </div>
</template>

<script>
import Testimonials from "@/components/Testimonials.vue";
import apiClient from "@/axios.js";

export default {
  name: "HomePage",
  components: {
    Testimonials,
  },
  data() {
    return {
      featuredBooks: [],
      genres: ["Tiểu thuyết", "Khoa học", "Lịch sử", "Văn học Việt Nam", "Thiếu nhi"],
      recommendedBooks: [],
    };
  },
  methods: {
    async fetchFeaturedBooks() {
      try {
        const response = await apiClient.get("/books/getall", { params: { featured: true } });
        this.featuredBooks = this.processBooks(response.data);
      } catch (error) {
        console.error("Error fetching featured books:", error);
      }
    },
    async fetchRecommendedBooks() {
      try {
        const response = await apiClient.get("/books/getall");
        this.recommendedBooks = this.processBooks(response.data);
      } catch (error) {
        console.error("Error fetching recommended books:", error);
      }
    },
    processBooks(books) {
      const baseURL = "http://localhost:5000";
      return books.map((book) => {
        // Thêm baseURL vào ảnh nếu cần
        book.images = book.images.map((image) => (image.startsWith(baseURL) ? image : `${baseURL}${image}`));
        // Lấy ảnh bìa đầu tiên làm coverImage
        book.coverImage = book.images.length > 0 ? book.images[0] : "/default-cover.jpg"; // Ảnh mặc định nếu không có ảnh
        return book;
      });
    },
    goToBookDetail(bookId) {
      this.$router.push({ name: "BookDetail", params: { id: bookId } });
    },
  },
  async mounted() {
    this.fetchFeaturedBooks();
    this.fetchRecommendedBooks();  },
};
</script>
<style scoped>
body {
  margin: 0;
  font-family: Arial, sans-serif;
  /* background: linear-gradient(100deg, #c4c6e5, #cadfe8); Hiệu ứng chuyển màu */
  color: #333;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

#home-page {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  color: #333;
}

/* Hero Section */
.hero-section {
  display: flex;
  flex-direction: column; /* Đặt nội dung theo chiều dọc */
  align-items: center;
  text-align: center;
  padding: 50px 20px;
  /* background: linear-gradient(135deg, #a5b3e4, #b6cfe0); Gradient chuyển màu */
  border-radius: 12px;
  margin: 20px auto;
  max-width: 1200px;
  
}

.hero-banner {
  width: 100%;
  height: 400px;
  object-fit: cover; /* Đảm bảo ảnh không bị méo */
  border-radius: 12px 12px 0 0; /* Bo góc phía trên */
  box-shadow: 0 7px 15px rgba(0, 0, 0, 0.3); 
}


.hero-content {
  background: rgba(219, 212, 237, 0.5); /* Lớp phủ màu đen mờ */
  color: rgb(58, 56, 56);
  padding: 20px;
  margin-top: 20px; /* Kéo nội dung lên gần ảnh */
  border-radius: 0 0 12px 12px; /* Bo góc phía dưới */
  width: calc(100% - 40px); /* Đảm bảo nội dung nằm trong giới hạn */
  max-width: 800px;
  text-align: center;
  box-shadow: 0 7px 12px rgba(0, 0, 0, 0.2);
}
.hero-content {
  opacity: 0; /* Ẩn nội dung ban đầu */
  transform: translateY(20px); /* Dịch xuống dưới */
  animation: fadeIn 1.5s ease-in-out forwards; /* Hiệu ứng mờ dần */
}

@keyframes fadeIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}


.hero-content h1 {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 20px;
}

.hero-content p {
  font-size: 1.2rem;
  margin-bottom: 20px;
}

.cta-button {
  padding: 12px 24px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-size: 1.1rem;
  transition: background-color 0.3s ease;
}

.cta-button:hover {
  background-color: #0056b3;
}

/* Featured Books and Recommended Books */
.featured-books, .recommended-books {
  padding: 40px 20px;
  text-align: center;
}

.featured-books h2, .recommended-books h2 {
  font-size: 2rem;
  margin-bottom: 30px;
}

.book-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.book-card {
  background: white;
  border: 1px solid #ddd;
  border-radius: 12px;
  width: 200px;
  overflow: hidden; /* Đảm bảo không bị tràn nội dung */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
}

.book-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
}

.book-image {
  width: 100%;
  height: 250px;
  object-fit: cover; /* Giữ tỉ lệ ảnh */
}

.book-info {
  padding: 15px;
  text-align: center;
}

.book-info h3 {
  font-size: 1.2rem;
  font-weight: bold;
  margin: 10px 0;
}

.book-info p {
  font-size: 0.9rem;
  color: #6c757d;
}

.view-button {
  display: inline-block;
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.view-button:hover {
  background-color: #0056b3;
}

/* Genres Section */
.genres-section {
  padding: 40px 20px;
  text-align: center;
}

.genres-section h2 {
  font-size: 2rem;
  margin-bottom: 30px;
}

.genres-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.genre-card {
  background: white;
  padding: 10px 20px;
  border-radius: 8px;
  border: 1px solid #ddd;
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;
}

.genre-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.genre-card a {
  color: #333;
  text-decoration: none;
  font-size: 1rem;
}

.genre-card a:hover {
  color: #007bff;
}

/* Testimonials */
.testimonials {
  padding: 40px 20px;
  background: rgba(255, 255, 255, 0.8);
  text-align: center;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

</style>
