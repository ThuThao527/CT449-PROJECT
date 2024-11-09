<!-- views/admin/AddBook.vue -->
<template>
  <div>
    <h2>Thêm Sách Mới</h2>
    <form @submit.prevent="addBook">
      <label>Tiêu đề sách:</label>
      <input v-model="newBook.title" required />
      <label>Tác giả:</label>
      <input v-model="newBook.author" required />
      <button type="submit">Thêm</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newBook: {
        title: '',
        author: '',
      },
    };
  },
  methods: {
    addBook() {
      console.log("Thêm sách:", this.newBook);
      // Gọi API thêm sách ở đây
    },
  },
};
</script>
