<template>
  <section class="container my-5">
    <div class="row">
      <div class="col-md-6 mb-4">
        <h3>For You</h3>
        <div class="d-flex gap-3 overflow-auto">
          <div class="card" style="width: 10rem;">
            <img src="https://via.placeholder.com/100x150" class="card-img-top" alt="Book Cover">
            <div class="card-body">
              <h6 class="card-title">Recommended Book 1</h6>
            </div>
          </div>
          <!-- Repeat card for other recommendations -->
        </div>
      </div>

      <div class="col-md-6 mb-4">
        <h3>Most Borrowed</h3>
        <div class="d-flex gap-3 overflow-auto">
          <div class="card" style="width: 10rem;">
            <img src="https://via.placeholder.com/100x150" class="card-img-top" alt="Book Cover">
            <div class="card-body">
              <h6 class="card-title">Popular Book 1</h6>
            </div>
          </div>
          <!-- Repeat card for other popular books -->
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Recommendations",
};
</script>
