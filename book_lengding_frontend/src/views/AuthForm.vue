<template>
  <div class="auth-container d-flex justify-content-center align-items-center">
    <div class="card auth-card">
      <div class="card-body">
        <h2 class="text-center mb-4">
          {{ isLogin ? 'Đăng nhập' : isStepOne ? 'Đăng ký' : 'Xác thực Email' }}
        </h2>

        <!-- Form Đăng nhập -->
        <form v-if="isLogin" @submit.prevent="handleLogin">
          <div class="mb-3">
            <label class="form-label">Email</label>
            <input type="text" v-model="email" class="form-control" required />
          </div>
          <div class="mb-3">
            <label class="form-label">Mật khẩu</label>
            <input type="password" v-model="password" class="form-control" required />
          </div>
          <div class="mb-3 text-end">
            <router-link to="/forgot-password" class="text-decoration-none">Bạn quên mật khẩu?</router-link>
          </div>
          <button type="submit" class="btn btn-primary w-100">Đăng nhập</button>
        </form>

        <!-- Form Đăng ký (Bước 1) -->
        <form v-else-if="isStepOne && !isStepTwo" @submit.prevent="registerUser">
          <div class="mb-3">
            <label class="form-label">Tên đầy đủ</label>
            <input type="text" v-model="userFullName" class="form-control" required />
          </div>
          <div class="mb-3">
            <label class="form-label">Mật khẩu</label>
            <input type="password" v-model="password" class="form-control" required />
          </div>
          <div class="mb-3">
            <label class="form-label">Nhập lại mật khẩu</label>
            <input type="password" v-model="confirmPassword" class="form-control" required />
          </div>
          <div class="mb-3">
            <label class="form-label">Mã số sinh viên</label>
            <input type="text" v-model="studentId" class="form-control" required />
          </div>
          <div class="mb-3">
            <label class="form-label">Giới tính</label>
            <select v-model="gender" class="form-control" required>
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
            </select>
          </div>
          <div class="mb-3">
            <label class="form-label">Số điện thoại</label>
            <input type="tel" v-model="phoneNumber" class="form-control" required />
          </div>
          <div class="mb-3">
            <label class="form-label">Email</label>
            <input type="email" v-model="email" class="form-control" required />
          </div>
          <button type="submit" class="btn btn-primary w-100">Tiếp tục</button>
        </form>

        <!-- Form Nhập OTP (Bước 2) -->
        <form v-else-if="isStepTwo" @submit.prevent="verifyOtp">
          <div class="mb-3">
            <label class="form-label">Nhập mã xác thực (OTP) từ email</label>
            <input type="text" v-model="otp" class="form-control" required />
          </div>
          <button type="submit" class="btn btn-primary w-100">Xác nhận</button>
        </form>

        <!-- Chuyển đổi giữa đăng nhập và đăng ký -->
        <div class="mt-3 text-center">
          <span>{{ isLogin ? 'Chưa có tài khoản?' : 'Đã có tài khoản?' }}</span>
          <a href="#" class="text-decoration-none" @click.prevent="toggleForm">
            {{ isLogin ? 'Đăng ký' : 'Đăng nhập' }}
          </a>
        </div>

        <!-- Thông báo lỗi nếu có -->
        <p v-if="errorMessage" class="text-danger text-center mt-3">{{ errorMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script>

import apiClient from '@/axios';
import eventBus  from '@/eventBus';
import { jwtDecode } from 'jwt-decode';

export default {
  data() {
    return {
      isLogin: true,      // Kiểm soát trạng thái đăng nhập/đăng ký
      isStepOne: true,    // Kiểm soát bước 1 của đăng ký
      isStepTwo: false,   // Kiểm soát bước 2 của đăng ký (xác thực OTP)
      userFullName: '',
      password: '',
      confirmPassword: '',
      studentId: '',
      gender: 'Nam',
      phoneNumber: '',
      email: '',
      otp: '',
      errorMessage: null,  // Hiển thị lỗi
    };
  },
  methods: {
    // Chuyển đổi giữa đăng nhập và đăng ký
    toggleForm() {
      this.isLogin = !this.isLogin;
      this.isStepOne = true;
      this.isStepTwo = false;
      this.clearFields();
    },
    // Xử lý đăng nhập
    async handleLogin() {
      try {
        const response = await apiClient.post('/user/login', {
          email: this.email,
          password: this.password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
      });
        const token = response.data.token;
        localStorage.setItem('token', token);

        console.log(this.email, this.password);
        eventBus.emit('loggedIn');
        // Giải mã token để kiểm tra vai trò của người dùng
        const decodedToken = jwtDecode(token);
        const role = decodedToken.role;

        if (role === 'Admin') {
          // Điều hướng đến trang admin nếu là admin
          this.$router.push('/admin');
        } else {
          // Điều hướng đến trang homepage nếu là người dùng bình thường
          this.$router.push('/homepage');
        }
        
      } catch (error) {
        console.error('Chi tiết lỗi:', error.response ? error.response.data : error.message);
        this.errorMessage = 'Đăng nhập thất bại. Vui lòng thử lại.';
      }
    },
    // Xử lý đăng ký (Bước 1)
    async registerUser() {
      if (this.password !== this.confirmPassword) {
        this.errorMessage = 'Mật khẩu không khớp!';
        return;
      }
      try {
        const response = await apiClient.post('/user/register', {
          userFullName: this.userFullName,
          password: this.password,
          idStudent: this.studentId,
          gender: this.gender,
          phoneNumber: this.phoneNumber,
          email: this.email,
        });
        if (response.data.success) {
          this.isStepOne = false; // Kết thúc bước 1
          this.isStepTwo = true;  // Bắt đầu bước 2 (Xác thực OTP)
          console.log('isStepOne:', this.isStepOne); // Debug
          console.log('isStepTwo:', this.isStepTwo); // Debug
          this.errorMessage = null;
        }
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          this.errorMessage = error.response.data.message; // Hiển thị lỗi từ backend
        } else {
          this.errorMessage = 'Đăng ký thất bại. Vui lòng thử lại.';
        }
        console.error('Chi tiết lỗi:', error.response ? error.response.data : error.message);
      }
    },
    // Xác thực OTP (Bước 2)
    async verifyOtp() {
      try {
        const response = await apiClient.post('/user/verify-otp', {
          email: this.email,
          otp: this.otp,
        });
        console.log(response.data);
        if (response.data.success) {
          this.$router.push('/login'); // Điều hướng đến trang đăng nhập sau khi xác thực thành công
        } else {
          this.errorMessage = 'Mã OTP không đúng. Vui lòng thử lại.';
        }
      } catch (error) {
        console.error('Chi tiết lỗi:', error.response ? error.response.data : error.message);
        this.errorMessage = 'Xác thực OTP thất bại. Vui lòng thử lại.';
      }
    },
    // Xóa các trường nhập liệu
    clearFields() {
      this.userFullName = '';
      this.password = '';
      this.confirmPassword = '';
      this.studentId = '';
      this.email = '';
      this.otp = '';
    },
  },
};
</script>
