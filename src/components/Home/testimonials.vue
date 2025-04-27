<template>
  <section class="testimonials">
    <h2>What Our Customers Say</h2>
    <div class="testimonial-grid">
      <div class="testimonial" v-for="n in 3" :key="n">
        <p>"CityEats is a lifesaver! Food always on time and hot."</p>
        <h4>- Customer {{ n }}</h4>
      </div>
    </div>
  </section>
</template>

<script setup></script>

<style scoped>
.testimonials {
  background-color: #f0faff;
  padding: 4rem 2rem;
  text-align: center;
}
.testimonials h2 {
  font-size: 2rem;
  margin-bottom: 2rem;
}
.testimonial-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
}
.testimonial {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 300px;
  font-style: italic;
}
.testimonial h4 {
  margin-top: 1rem;
  font-weight: normal;
  color: #444;
}
</style>
