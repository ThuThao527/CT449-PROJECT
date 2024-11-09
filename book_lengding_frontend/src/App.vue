<template>
  <div id="app">
    <Header />

    <main>
      <!-- Nội dung các trang sẽ được hiển thị ở đây -->
      <router-view></router-view>
    </main>
    <Footer />
      
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
export default {
  name: "App",
  components:{
    Header,
    Footer
  }
};
</script>

<style>

</style>
