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
            <label class="form-label">Tên đăng nhập</label>
            <input type="text" v-model="username" class="form-control" required />
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
        <form v-else-if="isStepOne" @submit.prevent="handleRegister">
          <div class="mb-3">
            <label class="form-label">Tên đăng nhập</label>
            <input type="text" v-model="username" class="form-control" required />
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
            <label class="form-label">Email</label>
            <input type="email" v-model="email" class="form-control" required />
          </div>
          <button type="submit" class="btn btn-primary w-100">Tiếp tục</button>
        </form>

        <!-- Form Nhập OTP (Bước 2) -->
        <form v-else @submit.prevent="verifyOtp">
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
import axios from 'axios';

export default {
  data() {
    return {
      isLogin: true,      // Kiểm soát trạng thái đăng nhập/đăng ký
      isStepOne: true,     // Kiểm soát bước của đăng ký
      username: '',
      password: '',
      confirmPassword: '',
      studentId: '',
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
      this.clearFields();
    },
    // Xử lý đăng nhập
    async handleLogin() {
      try {
        const response = await axios.post('http://localhost:5000/api/login', {
          username: this.username,
          password: this.password,
        });
        const token = response.data.token;
        localStorage.setItem('token', token);
        this.$router.push('/admin'); // Điều hướng đến trang admin
      } catch (error) {
        this.errorMessage = 'Đăng nhập thất bại. Vui lòng thử lại.';
      }
    },
    // Xử lý đăng ký (Bước 1)
    async handleRegister() {
      if (this.password !== this.confirmPassword) {
        this.errorMessage = 'Mật khẩu không khớp!';
        return;
      }
      try {
        const response = await axios.post('http://localhost:5000/api/register', {
          username: this.username,
          password: this.password,
          studentId: this.studentId,
          email: this.email,
        });
        if (response.data.success) {
          this.isStepOne = false; // Chuyển sang bước 2 nếu đăng ký thành công
          this.errorMessage = null;
        }
      } catch (error) {
        this.errorMessage = 'Đăng ký thất bại. Vui lòng thử lại.';
      }
    },
    // Xác thực OTP (Bước 2)
    async verifyOtp() {
      try {
        const response = await axios.post('http://localhost:5000/api/verify-otp', {
          email: this.email,
          otp: this.otp,
        });
        if (response.data.success) {
          this.$router.push('/login'); // Điều hướng đến trang đăng nhập sau khi xác thực thành công
        } else {
          this.errorMessage = 'Mã OTP không đúng. Vui lòng thử lại.';
        }
      } catch (error) {
        this.errorMessage = 'Xác thực OTP thất bại. Vui lòng thử lại.';
      }
    },
    // Xóa các trường nhập liệu
    clearFields() {
      this.username = '';
      this.password = '';
      this.confirmPassword = '';
      this.studentId = '';
      this.email = '';
      this.otp = '';
    },
  },
};
</script>

<style scoped>
.auth-container {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.auth-card {
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
