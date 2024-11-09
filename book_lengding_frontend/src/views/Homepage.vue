<template>
  <div id="app">
    <Banner />
    <Highlights />
    <Recommendations />
    <Testimonials />
  </div>
</template>

<script>
import Banner from '@/components/Banner.vue';
import Highlights from '@/components/Highlights.vue';
import Recommendations from '@/components/Recommendations.vue';
import Testimonials from '@/components/Testimonials.vue';

export default {
  components: {
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
