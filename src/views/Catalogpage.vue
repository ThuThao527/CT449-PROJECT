<template>
  <div class="catalog-page d-flex">
    <!-- Filter Sidebar -->
    <aside class="filter-sidebar p-3">
      <h4>Filter Books</h4>
      <div>
        <label>Genre</label>
        <select class="form-select">
          <option value="">All Genres</option>
          <!-- Các option khác cho thể loại -->
        </select>
      </div>
      <div>
        <label>Language</label>
        <select class="form-select">
          <option value="">All Languages</option>
          <!-- Các option khác cho ngôn ngữ -->
        </select>
      </div>
      <div>
        <label>Publication Date</label>
        <input type="date" class="form-control">
      </div>
      <div>
        <label>Author</label>
        <input type="text" class="form-control" placeholder="Search by author">
      </div>
      <div>
        <label>Sort By</label>
        <select class="form-select">
          <option value="popularity">Popularity</option>
          <option value="latest">Latest</option>
          <option value="rating">Rating</option>
        </select>
      </div>
    </aside>

    <!-- Book List -->
    <main class="book-list flex-grow-1 p-3">
      <div class="row">
        <!-- Book Card -->
        <div v-for="book in books" :key="book.id" class="col-md-4 mb-4">
          <div class="card h-100">
            <img :src="book.coverImage" class="card-img-top" :alt="book.title">
            <div class="card-body">
              <h5 class="card-title">{{ book.title }}</h5>
              <p class="card-text">Author: {{ book.author }}</p>
              <p class="card-text">Genre: {{ book.genre }}</p>
              <p class="card-text" :class="book.availability === 'Available' ? 'text-success' : 'text-danger'">
                {{ book.availability }}
              </p>
              <button class="btn btn-primary" @click="openQuickView(book)">Quick View</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'CatalogPage',
  data() {
    return {
      books: [
        { id: 1, title: 'Book Title 1', author: 'Author 1', genre: 'Genre 1', availability: 'Available', coverImage: '/path/to/image1.jpg' },
        { id: 2, title: 'Book Title 2', author: 'Author 2', genre: 'Genre 2', availability: 'Currently Borrowed', coverImage: '/path/to/image2.jpg' },
        // Thêm các sách khác ở đây
      ],
    };
  },
  methods: {
    openQuickView(book) {
      // Mở modal chi tiết sách (Quick View)
      console.log('Opening Quick View for:', book);
    },
  },
};
</script>

<style scoped>
.catalog-page {
  display: flex;
}

.filter-sidebar {
  width: 250px;
  background-color: #f8f9fa;
  border-right: 1px solid #dee2e6;
}

.book-list {
  flex-grow: 1;
}

.card-img-top {
  height: 200px;
  object-fit: cover;
}
</style>
