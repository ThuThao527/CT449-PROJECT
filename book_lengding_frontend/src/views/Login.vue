<template>
  <div>
    <h2>Đăng nhập</h2>
    <form @submit.prevent="login">
      <label>Email:</label>
      <input v-model="email" type="email" required />
      <label>Password:</label>
      <input v-model="password" type="password" required />
      <button type="submit">Đăng nhập</button>
    </form>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import apiClient from '../axios';

export default {
  data() {
    return {
      email: '',
      password: '',
      error: null,
    };
  },
  methods: {
    async login() {
      try {
        const response = await apiClient.post('http://localhost:5000/api/login', {
          email: this.email,
          password: this.password,
        });
        const token = response.data.token;
        localStorage.setItem('token', token); // Lưu token vào localStorage
        this.$router.push('/admin'); // Điều hướng đến trang admin
      } catch (error) {
        this.error = 'Đăng nhập thất bại';
      }
    },
  },
};
</script>
