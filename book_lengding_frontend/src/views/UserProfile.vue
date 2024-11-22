<template>
  <div class="user-profile container py-5">
    <h2>User Information</h2>

    <!-- User Information -->
    <section class="user-info mb-4">
      <p><strong>Name:</strong> {{ user.userFullName }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <button class="btn btn-secondary" @click="editUserInfo">Edit Information</button>
    </section>

    <!-- Edit Information Modal -->
    <b-modal v-model="showEditModal" title="Edit User Information">
      <b-form @submit.prevent="saveUserInfo">
        <b-form-group label="Full Name" label-for="userFullName">
          <b-form-input id="userFullName" v-model="editableUser.userFullName" required></b-form-input>
        </b-form-group>

        <b-form-group label="Email" label-for="email">
          <b-form-input id="email" v-model="editableUser.email" type="email" required></b-form-input>
        </b-form-group>

        <b-form-group label="Gender" label-for="gender">
          <b-form-select id="gender" v-model="editableUser.gender" :options="['Male', 'Female', 'Other']" required></b-form-select>
        </b-form-group>

        <b-form-group label="Phone Number" label-for="phoneNumber">
          <b-form-input id="phoneNumber" v-model="editableUser.phoneNumber" type="tel" required></b-form-input>
        </b-form-group>

        <b-form-group label="Day of Birth" label-for="dayOfBirth">
          <b-form-input id="dayOfBirth" v-model="editableUser.dayOfBirth" type="date" required></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">Save</b-button>
      </b-form>
    </b-modal>

    <!-- Renew Book Modal -->
    <b-modal v-model="showRenewModal" title="Renew Book">
      <b-form @submit.prevent="submitRenewal">
        <p>You can only extend the due date by 7 days.</p>
        <b-form-group label="New Due Date" label-for="newDueDate">
          <b-form-input id="newDueDate" v-model="newDueDate" type="date" required></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Renew</b-button>
      </b-form>
    </b-modal>

    <section class="currently-borrowed">
      <h3>Currently Borrowed</h3>
      <table class="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Borrow Date</th>
            <th>dueDate</th>
            <th>book renewal</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="book in currentlyBorrowed" :key="book.bookId._id">
            <td>{{ book.bookId.title }}</td>
            <td>{{ book.bookId.author }}</td>
            <td>{{ formatDate(book.approvalDate) }}</td>
            <td>{{ formatDate(book.dueDate) }} </td>
            <td>
              <button class="btn btn-warning btn-sm" @click="openRenewModal(book)">Renew</button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="borrow-history">
      <h3>Borrow History</h3>
      <table class="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Borrow Date</th>
            <th>Returned Date</th>
            <th>Rating / Review</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="history in borrowHistory" :key="history.bookId._id">
            <td>{{ history.bookId.title }}</td>
            <td>{{ history.bookId.author }}</td>
            <td>{{ formatDate(history.approvalDate) }}</td>
            <td>{{ formatDate(history.returnedDate) }}</td>
            <td>
              <input type="number" v-model="history.rating" min="1" max="5" class="form-control d-inline-block w-25" />
              <button class="btn btn-primary btn-sm ms-2" @click="submitReview(history)">Submit</button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>

    
  </div>
</template>

<script>
import apiClient from "@/axios";
import { BModal, BForm, BFormGroup, BFormInput, BFormSelect, BButton } from 'bootstrap-vue-3';

export default {
  name: "UserProfile",
  components: {
    BModal,
    BForm,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BButton,
  },
  data() {
    return {
      user: {}, // Dữ liệu người dùng
      editableUser: {}, // Dữ liệu người dùng có thể chỉnh sửa
      showEditModal: false, // Hiển thị modal chỉnh sửa thông tin
      borrowHistory: [], // Lịch sử mượn sách
      currentlyBorrowed: [], // Sách đang mượn
    };
  },
  methods: {
    // Hàm định dạng ngày tháng
    formatDate(dateString) {
      if (!dateString) return "";
      const date = new Date(dateString);
      return `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
    },

    // Lấy thông tin người dùng
    async fetchUserProfile() {
      try {
        const response = await apiClient.get("/user/UserProfile");
        this.user = response.data;
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    },

    // Lấy danh sách sách đã và đang mượn
    async fetchBorrowedBooks() {
      try {
        const idStudent = "B2207766"; // Thay bằng idStudent thực tế
        const response = await apiClient.get(`/books/borrowRequests/listBooks?idStudent=${idStudent}`, {
          withCredentials: true,
        });
        this.currentlyBorrowed = response.data.currentlyBorrowed;
        this.borrowHistory = response.data.borrowHistory;
      } catch (error) {
        console.error("Error fetching borrowed books:", error);
      }
    },

    // Gia hạn sách - Mở form gia hạn
    openRenewModal(book) {
      this.bookToRenew = book;
      this.newDueDate = ""; // Reset ngày hết hạn mới
      this.showRenewModal = true;
    },

    // Gia hạn sách - Xử lý gia hạn
    async submitRenewal() {
      if (this.bookToRenew) {
        try {
          await apiClient.post(`/books/renew/${this.bookToRenew._id}`, { newDueDate: this.newDueDate });
          alert("Book renewed successfully");
          this.fetchBorrowedBooks(); // Refresh data
          this.showRenewModal = false; // Đóng modal
        } catch (error) {
          alert("Error renewing book");
          console.error("Error:", error);
        }
      }
    },

    // Gửi đánh giá
    async submitReview(history) {
      console.log(`Submitting review for ${history.bookId.title} with rating: ${history.rating}`);
      // TODO: Xử lý logic đánh giá
    },

    // Hiển thị form chỉnh sửa thông tin người dùng
    editUserInfo() {
      this.editableUser = { ...this.user }; // Tạo bản sao của thông tin người dùng để chỉnh sửa
      this.showEditModal = true;
    },

    // Lưu thông tin người dùng
    async saveUserInfo() {
      try {
        await apiClient.put("/user/updateUserProfile", this.editableUser);
        this.user = { ...this.editableUser }; // Cập nhật thông tin người dùng hiện tại
        this.showEditModal = false; // Đóng modal
        alert("User information updated successfully");
      } catch (error) {
        alert("Error updating user information");
        console.error("Error:", error);
      }
    },
  },
  async mounted() {
    this.fetchUserProfile();
    this.fetchBorrowedBooks();
  },
};
</script>


<style scoped>
.user-profile {
  max-width: 900px;
  margin: auto;
}

h2,
h3 {
  margin-bottom: 20px;
  color: #343a40;
}

.table th {
  background-color: #007bff;
  color: white;
}

.btn-warning {
  background-color: #f0ad4e;
  border: none;
}

.btn-primary {
  background-color: #007bff;
  border: none;
}
</style>
