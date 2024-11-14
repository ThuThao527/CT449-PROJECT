<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-body">
                <div class="row">
                    <div class="col-md-5">
                        <div id="carouselExample" class="carousel slide">
                            <div class="carousel-inner">
                                <div v-for="(image, index) in book.images" :key="index"
                                    :class="['carousel-item', { active: index === 0 }]">
                                    <img :src="image" class="d-block w-100" alt="Book image" />
                                </div>
                            </div>
                            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample"
                                data-bs-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Previous</span>
                            </button>
                            <button class="carousel-control-next" type="button" data-bs-target="#carouselExample"
                                data-bs-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                    <div class="col-md-7">
                        <h2 class="card-title">{{ book.title }}</h2>
                        <h4 class="card-subtitle text-muted mb-3">by {{ book.author }}</h4>
                        <p><strong>Genre:</strong> <span v-for="(genre, index) in book.genre" :key="index">{{ genre
                                }}<span v-if="index < book.genre.length - 1">, </span></span></p>
                        <p class="card-text"><strong>Description:</strong> {{ book.description }}</p>
                        <p class="card-text"><strong>Rating:</strong> {{ book.rating }} / 5</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            book: {},
        };
    },
    created() {
        this.fetchBookDetails();
    },
    methods: {
        async fetchBookDetails() {
            try {
                const bookId = this.$route.params.id; // Lấy ID từ URL
                const token = localStorage.getItem('token'); // Lấy token từ localStorage

                const response = await axios.get(`/api/books/${bookId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                this.book = response.data;
            } catch (error) {
                console.error('Failed to fetch book details:', error);
                if (error.response && error.response.status === 401) {
                    this.$router.push('/login'); // Chuyển hướng nếu chưa đăng nhập
                }
            }
        },
    },
};
</script>

<style scoped>
.carousel-item img {
    max-height: 400px;
    object-fit: cover;
}
</style>
