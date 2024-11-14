<template>
  <div class="add-book-container">
    <h2>Thêm Sách Mới</h2>
    <form @submit.prevent="addBook" class="add-book-form">
      <div class="form-group">
        <label>Tiêu đề sách:</label>
        <input v-model="newBook.title" required placeholder="Nhập tiêu đề sách" />
      </div>
      <div class="form-group">
        <label>Tác giả:</label>
        <input v-model="newBook.author" required placeholder="Nhập tác giả" />
      </div>
       <div class="form-group">
        <label>Thể loại:</label>
        <multiselect
          v-model="newBook.genre"
          :options="genres"
          :multiple="true"
          :taggable="true"
          placeholder="Chọn thể loại"
          label="name"
          track-by="name"
          @tag="addGenre"
          class="genre-multiselect"
          @input="onGenreSelect"
        />
      </div>
      <div class="form-group">
        <label>Tổng số lượng sách:</label>
        <input type="number" v-model.number="newBook.totalCopies" required placeholder="Nhập tổng số lượng sách" />
      </div>
      <div class="form-group">
        <label>Số lượng sách hiện có:</label>
        <input type="number" v-model.number="newBook.availableCopies" required placeholder="Nhập số lượng sách hiện có" />
      </div>
      <div class="form-group">
        <label>Mô tả sách:</label>
        <textarea v-model="newBook.description" placeholder="Nhập mô tả về sách"></textarea>
      </div>
      <div class="form-group">
        <label>Vị trí sách:</label>
        <div class="position-fields">
          <label>Tầng</label>
          <input type="number" v-model.number="newBook.position.floor" required placeholder="Tầng" />
          <label>Kệ</label>
          <input type="text" v-model="newBook.position.shelf" required placeholder="Kệ sách" />
          <label>Khu vực</label>
          <input type="text" v-model="newBook.position.section" placeholder="Khu vực (tuỳ chọn)" />
        </div>
      </div>
      <div class="form-group">
        <label>Hình ảnh sách:</label>
        <input type="file" @change="handleFileChange" multiple />
        <div class="preview-container">
    <div v-for="(image, index) in previewImages" :key="index" class="image-preview">
      <img :src="image" alt="Book Image Preview" class="image-thumbnail">
    </div>
  </div>

      </div>
      <button type="submit" class="submit-button">Thêm Sách</button>
    </form>
  </div>
</template>

<script>

import Multiselect from 'vue-multiselect';
import apiClient from '@/axios';
import { jwtDecode } from 'jwt-decode';


export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      newBook: {
        title: '',
        author: '',
        genre: [],
        totalCopies: 1,
        availableCopies: 1,
        description: '',
        position: {
          floor: 1,
          shelf: '',
          section: '',
        },
        images: [],
      },
      genres: [
        { name: 'Adventure' },
        { name: 'Mystery' },
        { name: 'Romance' },
        { name: 'Science fiction' },
        { name: 'Fantasy' },
        { name: 'Non-fiction' },
        { name: 'Biography' },
        { name: 'Autobiography' },
        { name: 'Health' },
        { name: 'Philosophy' },
        { name: 'Psychology' },
        { name: 'Science' },
        { name: 'History' },
        { name: 'Politics' },
        { name: 'Educational' },
        { name: 'Textbooks' },
        { name: 'Academic' },
        { name: 'Reference' },
        { name: 'Language learning' },
        { name: 'Mathematics' },
        { name: 'Engineering' },
        { name: 'Computer science' },
        { name: 'Economics' },
        { name: 'Religion' },
        { name: 'Lifestyle' },
        { name: 'Art' },
        { name: 'Photography' },
        { name: 'Poetry' },
        { name: 'Essays' },
      ],
    };
  },
  methods: {
    async addBook() {
      try {
        //     const token = localStorage.getItem('token');
        
        // if (!token) {
        //   alert('Không tìm thấy token. Bạn cần đăng nhập lại.');
        //   return;
        // }

        const formData = new FormData();
        formData.append('title', this.newBook.title);
        formData.append('author', this.newBook.author);
        formData.append('genre', JSON.stringify(this.newBook.genre.map(genre => genre.name)));
        formData.append('totalCopies', this.newBook.totalCopies);
        formData.append('availableCopies', this.newBook.availableCopies);
        formData.append('description', this.newBook.description);
        formData.append('position', JSON.stringify(this.newBook.position));
        
        // Thêm các file hình ảnh vào formData
        for (let i = 0; i < this.newBook.images.length; i++) {
          formData.append('images', this.newBook.images[i]);
          console.log(this.newBook.images);

        }
        for (let [key, value] of formData.entries()) {
          console.log(`${key}:`, value);
        }


        // Gọi API để thêm sách
        const response = await apiClient.post('/admin/add-book', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            // 'Authorization': token,
          },
        });
        

        if (response.status === 201) {
          alert('Thêm sách thành công');
          this.resetForm();
        }
      } catch (error) {
        console.error('Lỗi khi thêm sách:', error);
        alert('Đã xảy ra lỗi khi thêm sách. Vui lòng thử lại.');
      }
    },
   handleFileChange(event) {
  const files = event.target.files;
  this.newBook.images = Array.from(files);

  // Đặt lại mảng xem trước để Vue có thể nhận biết sự thay đổi
  this.previewImages = [];

  // Đọc từng file và thêm vào mảng previewImages
  for (let i = 0; i < files.length; i++) {
    const reader = new FileReader();
    reader.onload = (e) => {
      // Thêm base64 vào previewImages và đảm bảo Vue nhận ra thay đổi bằng cách tạo một bản sao mới
      this.previewImages = [...this.previewImages, e.target.result];
      console.log('Base64 Image:', e.target.result); // Kiểm tra xem dữ liệu Base64 có được tạo ra không
      this.previewImages = [...this.previewImages, e.target.result];
    }
  };
    reader.readAsDataURL(files[i]);
  },
    addGenre(newGenre) {
      const genre = { name: newGenre };
      this.genres.push(genre);
      this.newBook.genre.push(genre);
    },
    resetForm() {
      this.newBook = {
        title: '',
        author: '',
        genre: [],
        totalCopies: 1,
        availableCopies: 1,
        description: '',
        position: {
          floor: 1,
          shelf: '',
          section: '',
        },
        images: [],
      };
    },
  },
};
</script>

<style scoped>
.add-book-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
}
.add-book-form {
  display: flex;
  flex-direction: column;
}
.form-group {
  margin-bottom: 15px;
}
.form-group label {
  font-weight: bold;
  margin-bottom: 5px;
}
.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.genre-multiselect {
  max-height: 150px; 
  overflow-y: auto;  
}
.position-fields {
  display: flex;
  gap: 10px;
}
.image-preview {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}
.image-preview img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.submit-button {
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.submit-button:hover {
  background-color: #0056b3;
}

.multiselect--active {
  border: 1px solid #ccc; /* Đảm bảo đường viền đồng nhất */
}
.multiselect {
  margin: 0 !important;
  padding: 0 !important;
}

.multiselect__tags {
  margin-left: 0 !important; /* Nếu khoảng trắng nằm bên trái */
  padding-left: 5px !important; /* Đảm bảo hiển thị gọn gàng */
}

.multiselect__input {
  margin-left: 0 !important;
}
.image-thumbnail {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 10px;
}



</style>
