<template>
  <div id="app">
    <Header />
    <Banner />
    <Highlights />
    <Recommendations />
    <Testimonials />
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import Banner from '@/components/Banner.vue';
import Highlights from '@/components/Highlights.vue';
import Recommendations from '@/components/Recommendations.vue';
import Testimonials from '@/components/Testimonials.vue';

export default {
  components: {
    Header,
    Footer,
    Banner,
    Highlights,
    Recommendations,
    Testimonials,
  },
};
</script>

<style>
/* Style toàn cục cho ứng dụng */
#app {
  font-family: Arial, sans-serif;
}
</style>
