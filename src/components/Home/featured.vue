<template>
  <section class="featured-meals">
    <h2>🌟 Featured Meals</h2>
    <div class="meal-grid">
      <div class="meal-card" v-for="n in 6" :key="n">
        <img :src="'https://picsum.photos/400/300'" alt="meal image" />
        <h4>Chef’s Pick #{{ n }}</h4>
        <p>Popular and personally recommended.</p>
      </div>
    </div>
  </section>
</template>

<script setup></script>

<style scoped>
.featured-meals {
  padding: 4rem 2rem;
  text-align: center;
  background: #fef9f4;
}
.featured-meals h2 {
  margin-bottom: 2rem;
}
.meal-grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}
.meal-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}
.meal-card:hover {
  transform: translateY(-5px);
}
.meal-card img {
  width: 100%;
  height: 150px;
  object-fit: cover;
}
.meal-card h4 {
  margin: 0.5rem 0;
}
.meal-card p {
  font-size: 0.9rem;
  padding-bottom: 1rem;
}
</style>
