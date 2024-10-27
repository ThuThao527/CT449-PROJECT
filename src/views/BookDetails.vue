<template>
  <div class="book-details-page container py-5">
    <!-- Book Information -->
    <div class="row mb-4">
      <div class="col-md-4">
        <!-- Cover Image -->
        <img :src="book.coverImage" alt="Book Cover" class="img-fluid rounded shadow" />
      </div>
      <div class="col-md-8">
        <!-- Details -->
        <h1 class="display-5">{{ book.title }}</h1>
        <p class="text-muted">by {{ book.author }}</p>
        <p><strong>Genre:</strong> {{ book.genre }}</p>
        <p><strong>Publish Date:</strong> {{ book.publishDate }}</p>
        <p>
          <strong>Status:</strong>
          <span :class="book.availability === 'Available' ? 'text-success' : 'text-danger'">
            {{ book.availability }}
          </span>
        </p>
        
        <!-- Description -->
        <p class="mt-3">{{ book.description }}</p>

        <!-- Borrow Button -->
        <button class="btn btn-primary btn-lg mt-4" @click="addToBorrowCart(book)">
          Borrow This Book
        </button>
      </div>
    </div>

    <!-- Similar Books Carousel -->
    <h3>Similar Books</h3>
    <div class="similar-books-carousel mt-3">
      <div v-for="similarBook in similarBooks" :key="similarBook.id" class="carousel-item">
        <img :src="similarBook.coverImage" alt="Similar Book Cover" class="img-thumbnail" />
        <h5 class="mt-2">{{ similarBook.title }}</h5>
        <p class="text-muted">{{ similarBook.author }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BookDetails",
  data() {
    return {
      book: {
        id: this.$route.params.id, // Giả sử lấy ID sách từ route
        coverImage: '/path/to/book-cover.jpg',
        title: 'Book Title',
        author: 'Author Name',
        genre: 'Genre',
        publishDate: '2023-10-01',
        availability: 'Available',
        description: 'This is a detailed summary of the book...'
      },
      similarBooks: [
        // Dữ liệu giả cho các sách tương tự, có thể thay bằng API thực tế
        { id: 1, coverImage: '/path/to/similar-book1.jpg', title: 'Similar Book 1', author: 'Author 1' },
        { id: 2, coverImage: '/path/to/similar-book2.jpg', title: 'Similar Book 2', author: 'Author 2' },
        { id: 3, coverImage: '/path/to/similar-book3.jpg', title: 'Similar Book 3', author: 'Author 3' },
      ],
    };
  },
  methods: {
    addToBorrowCart(book) {
      // Thêm logic để đưa sách vào giỏ mượn (borrow cart)
      console.log("Added to borrow cart:", book);
    },
  },
};
</script>

<style scoped>
.book-details-page {
  max-width: 800px;
  margin: auto;
}

.similar-books-carousel {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 10px;
}

.carousel-item {
  flex: 0 0 auto;
  text-align: center;
  width: 150px;
}

.carousel-item img {
  width: 100%;
  height: auto;
}
</style>
