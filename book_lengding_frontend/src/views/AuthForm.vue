<template>
  <div class="auth-container d-flex justify-content-center align-items-center">
    <div class="card auth-card shadow-lg rounded-4 p-4" style="width: 400px;">
      <div class="card-body">
        <h2 class="text-center mb-4 text-primary fw-bold">
          {{ isLogin ? 'Login' : isStepOne ? 'Register' : 'Verify Email' }}
        </h2>

        <!-- Login Form -->
        <form v-if="isLogin" @submit.prevent="handleLogin">
          <div class="mb-3">
            <label class="form-label text-secondary fw-semibold">Email</label>
            <input type="text" v-model="email" class="form-control form-control-lg rounded-pill" required />
          </div>
          <div class="mb-3">
            <label class="form-label text-secondary fw-semibold">Password</label>
            <input type="password" v-model="password" class="form-control form-control-lg rounded-pill" required />
          </div>
          <div class="mb-3 text-end">
            <router-link to="/forgot-password" class="text-decoration-none text-primary">Forgot your password?</router-link>
          </div>
          <button type="submit" class="btn btn-primary btn-lg w-100 rounded-pill">Login</button>
        </form>

        <!-- Register Form (Step 1) -->
        <form v-else-if="isStepOne && !isStepTwo" @submit.prevent="registerUser">
          <div class="mb-3">
            <label class="form-label text-secondary fw-semibold">Full Name</label>
            <input type="text" v-model="userFullName" class="form-control form-control-lg rounded-pill" required />
          </div>
          <div class="mb-3">
            <label class="form-label text-secondary fw-semibold">Password</label>
            <input type="password" v-model="password" class="form-control form-control-lg rounded-pill" required />
          </div>
          <div class="mb-3">
            <label class="form-label text-secondary fw-semibold">Confirm Password</label>
            <input type="password" v-model="confirmPassword" class="form-control form-control-lg rounded-pill" required />
          </div>
          <div class="mb-3">
            <label class="form-label text-secondary fw-semibold">Student ID</label>
            <input type="text" v-model="studentId" class="form-control form-control-lg rounded-pill" required />
          </div>
          <div class="mb-3">
            <label class="form-label text-secondary fw-semibold">Gender</label>
            <select v-model="gender" class="form-control form-control-lg rounded-pill" required>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div class="mb-3">
            <label class="form-label text-secondary fw-semibold">Phone Number</label>
            <input type="tel" v-model="phoneNumber" class="form-control form-control-lg rounded-pill" required />
          </div>
          <div class="mb-3">
            <label class="form-label text-secondary fw-semibold">Email</label>
            <input type="email" v-model="email" class="form-control form-control-lg rounded-pill" required />
          </div>
          <button type="submit" class="btn btn-primary btn-lg w-100 rounded-pill">Continue</button>
        </form>

        <!-- OTP Verification Form (Step 2) -->
        <form v-else-if="isStepTwo" @submit.prevent="verifyOtp">
          <div class="mb-3">
            <label class="form-label text-secondary fw-semibold">Enter verification code (OTP) from email</label>
            <input type="text" v-model="otp" class="form-control form-control-lg rounded-pill" required />
          </div>
          <button type="submit" class="btn btn-primary btn-lg w-100 rounded-pill">Confirm</button>
        </form>

        <!-- Toggle between login and register -->
        <div class="mt-4 text-center">
          <span class="text-secondary fw-semibold">{{ isLogin ? 'Do not have an account?' : 'Already have an account?' }}</span>
          <a href="#" class="text-decoration-none text-primary fw-bold" @click.prevent="toggleForm">
            {{ isLogin ? 'Register' : 'Login' }}
          </a>
        </div>

        <!-- Error message if any -->
        <p v-if="errorMessage" class="text-danger text-center mt-3 fw-semibold">{{ errorMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import apiClient from '@/axios';
import eventBus  from '@/eventBus';

export default {
  data() {
    return {
      isLogin: true,      // Control login/register state
      isStepOne: true,    // Control step 1 of registration
      isStepTwo: false,   // Control step 2 of registration (OTP verification)
      userFullName: '',
      password: '',
      confirmPassword: '',
      studentId: '',
      gender: 'Male',
      phoneNumber: '',
      email: '',
      otp: '',
      errorMessage: null,  // Display error
    };
  },
  methods: {
    // Toggle between login and register
    toggleForm() {
      this.isLogin = !this.isLogin;
      this.isStepOne = true;
      this.isStepTwo = false;
      this.clearFields();
    },
    // Handle login
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
          withCredentials: true,
        },
         
    );

        const user = response.data.user;
        localStorage.setItem('userId', user._id);

        console.log(this.email, this.password);

        // // Navigate based on user role
        // if (user.role === 'Admin') {
        //   console.log("Redirecting to admin page");
        //     this.$router.push('/admin')
        //       .catch((err) => {
        //         console.error("Navigation Error:", err);
        //       });
        // } else {
        //   // Navigate to homepage if regular user
        //   this.$router.push('/homepage');
        // }

        if (user.role === 'Admin') {
            console.log("Redirecting to admin page");
            this.$nextTick(() => {
              this.$router.push('/admin')
                .catch((err) => {
                  console.error("Navigation Error:", err);
                });
            });
          } else {
            console.log("Redirecting to homepage");
            this.$nextTick(() => {
              this.$router.push('/homepage');
            });
          }

        eventBus.emit('loggedIn');

        
      } catch (error) {
        console.error('Error details:', error.response ? error.response.data : error.message);
        this.errorMessage = 'Login failed. Please try again.';
      }
    },
    // Handle registration (Step 1)
    async registerUser() {
      if (this.password !== this.confirmPassword) {
        this.errorMessage = 'Passwords do not match!';
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
          this.isStepOne = false; // End step 1
          this.isStepTwo = true;  // Start step 2 (OTP verification)
          console.log('isStepOne:', this.isStepOne); // Debug
          console.log('isStepTwo:', this.isStepTwo); // Debug
          this.errorMessage = null;
        }
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          this.errorMessage = error.response.data.message; // Display error from backend
        } else {
          this.errorMessage = 'Registration failed. Please try again.';
        }
        console.error('Error details:', error.response ? error.response.data : error.message);
      }
    },
    // Verify OTP (Step 2)
    async verifyOtp() {
      try {
        const response = await apiClient.post('/user/verify-otp', {
          email: this.email,
          otp: this.otp,
        });
        console.log(response.data);
        if (response.data.success) {
          this.$router.push('/user/login'); // Navigate to login page after successful verification
        } else {
          this.errorMessage = 'Incorrect OTP. Please try again.';
        }
      } catch (error) {
        console.error('Error details:', error.response ? error.response.data : error.message);
        this.errorMessage = 'OTP verification failed. Please try again.';
      }
    },
    // Clear input fields
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

<style scoped>
.auth-container {
  min-height: 100vh;
  background-color: #f8f9fa;
}
.auth-card {
  width: 100%;
  max-width: 450px;
  border: none;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
}
.text-primary {
  color: #007bff !important;
}
.btn-primary {
  background-color: #007bff;
  border: none;
  transition: background-color 0.3s ease;
}
.btn-primary:hover {
  background-color: #0056b3;
}
.form-control-lg {
  height: calc(1.5em + 1.25rem + 2px);
  padding: 0.5rem 1rem;
  font-size: 1.25rem;
  border-radius: 2rem;
}
.text-secondary {
  color: #6c757d;
}
.fw-bold {
  font-weight: 700;
}
.fw-semibold {
  font-weight: 600;
}
</style>
