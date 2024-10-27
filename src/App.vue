<template>
  <div id="app">
    <header>
      <nav>
        <router-link to="/">Home</router-link> |
        <router-link to="/catalog">Catalog</router-link> |
        <router-link to="/book">Book</router-link>|
        <router-link to="/borrow-cart">borrow cart</router-link>|
        <router-link to="/profile">profile</router-link>|
        <router-link to="/checkout">checkout</router-link>
      </nav>
    </header>
    <main>
      <!-- Nội dung các trang sẽ được hiển thị ở đây -->
      <router-view></router-view>
    </main>
    <footer>
      <p>&copy; 2024 BookBorrow</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
/* CSS cho toàn ứng dụng */
</style>
