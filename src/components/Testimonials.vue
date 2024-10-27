<!-- TestimonialCarousel.vue -->
<template>
  <div class="carousel-container">
    <h2 class="text-center mb-4">What Our Readers Say</h2>
    <div class="carousel-wrapper">
      <transition name="chunk">
        <div class="testimonials-chunk" :key="currentChunkIndex">
          <div v-for="testimonial in currentChunk" 
               :key="testimonial.id"
               class="testimonial-item">
            <img :src="testimonial.avatar" :alt="testimonial.name" class="avatar">
            <h3>{{ testimonial.name }}</h3>
            <p class="role">{{ testimonial.role }}</p>
            <p class="comment">"{{ testimonial.comment }}"</p>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TestimonialCarousel',
  data() {
    return {
      testimonials: [
        { id: 1, name: 'John Doe', role: 'Book Lover', comment: 'This website has an amazing collection of books!', avatar: '/avatar1.jpg' },
        { id: 2, name: 'Jane Smith', role: 'Avid Reader', comment: 'I found all my favorite books here. The process was smooth!', avatar: '/avatar2.jpg' },
        { id: 3, name: 'Samuel Lee', role: 'Student', comment: 'Perfect place to borrow books for my studies!', avatar: '/avatar3.jpg' },
        { id: 4, name: 'Emily Johnson', role: 'Writer', comment: 'A wonderful platform for readers and writers alike!', avatar: '/avatar4.jpg' },
        { id: 5, name: 'Michael Brown', role: 'Researcher', comment: 'The best place to find rare books and references!', avatar: '/avatar5.jpg' },
        { id: 6, name: 'Sarah Wilson', role: 'Historian', comment: 'A delightful experience for anyone who loves books!', avatar: '/avatar6.jpg' },
      ],
      currentChunkIndex: 0,
      chunkSize: 3,
      autoPlayInterval: null
    }
  },
  computed: {
    chunks() {
      const chunks = [];
      for (let i = 0; i < this.testimonials.length; i += this.chunkSize) {
        chunks.push(this.testimonials.slice(i, i + this.chunkSize));
      }
      return chunks;
    },
    currentChunk() {
      return this.chunks[this.currentChunkIndex];
    },
    totalChunks() {
      return this.chunks.length;
    }
  },
  methods: {
    slideNext() {
      this.currentChunkIndex = (this.currentChunkIndex + 1) % this.totalChunks;
    },
    slidePrev() {
      this.currentChunkIndex = (this.currentChunkIndex - 1 + this.totalChunks) % this.totalChunks;
    },
    startAutoPlay() {
      this.autoPlayInterval = setInterval(() => {
        this.slideNext();
      }, 5000);
    },
    stopAutoPlay() {
      if (this.autoPlayInterval) {
        clearInterval(this.autoPlayInterval);
      }
    }
  },
  mounted() {
    this.startAutoPlay();
  },
  beforeDestroy() {
    this.stopAutoPlay();
  }
}
</script>

<style scoped>
.carousel-container {
  width: 100%;
  padding: 20px;
  overflow: hidden;
}

.carousel-wrapper {
  position: relative;
  height: 400px; /* Điều chỉnh chiều cao phù hợp với nội dung */
}

.testimonials-chunk {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  position: absolute;
  width: 100%;
}

.testimonial-item {
  width: calc(33.333% - 30px);
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 8px;
  text-align: center;
  background: white;
}

.testimonial-item .avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
}

.testimonial-item h3 {
  font-size: 1.1rem;
  font-weight: bold;
  margin: 5px 0;
}

.testimonial-item .role {
  font-size: 0.9rem;
  color: gray;
  margin-bottom: 10px;
}

.testimonial-item .comment {
  font-size: 0.95rem;
  font-style: italic;
  color: #555;
}

.chunk-enter-active,
.chunk-leave-active {
  transition: all 0.5s ease-in-out;
}

.chunk-enter-from {
  transform: translateX(100%);
}

.chunk-leave-to {
  transform: translateX(-100%);
}

/* Đảm bảo chunk mới luôn nằm trên cùng */
.chunk-enter-active {
  z-index: 1;
}
</style>
