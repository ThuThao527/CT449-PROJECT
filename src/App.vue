<template>
  <div id="app">
    <Header />
    <Footer />
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

export default {
  components: {
    Header,
    Footer
  }
};
</script>

<style>
/* Style toàn cục cho ứng dụng */
#app {
  font-family: Arial, sans-serif;
}
</style>
