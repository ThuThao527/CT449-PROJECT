<template>
  <section class="container my-5">
    <div class="row">
      <!-- Popular Genres -->
      <div class="col-md-6 mb-4">
        <h3>Popular Genres</h3>
        <div class="d-flex flex-wrap gap-2">
          <button class="btn btn-outline-primary">Fiction</button>
          <button class="btn btn-outline-primary">Science</button>
          <button class="btn btn-outline-primary">Romance</button>
          <button class="btn btn-outline-primary">Biography</button>
        </div>
      </div>

      <!-- New Arrivals -->
      <div class="col-md-8 mb-6">
        <h3>New Arrivals</h3>
        <div class="d-flex gap-3 overflow-auto">
          <div class="card" style="width: 10rem;">
            <img src="https://via.placeholder.com/100x150" class="card-img-top" alt="Book Cover">
            <div class="card-body">
              <h6 class="card-title">New Book 1</h6>
            </div>
          </div>
          <!-- Repeat card for other books -->
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Highlights",
};
</script>
