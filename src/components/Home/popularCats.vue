<template>
  <section class="categories">
    <h2>🍽️ Popular Categories</h2>
    <div class="category-grid">
      <div class="category" v-for="(name, i) in cats" :key="i">
        <div class="emoji">{{ emojis[i] }}</div>
        <h4>{{ name }}</h4>
      </div>
    </div>
  </section>
</template>

<script setup>
const cats = ["Pizza", "Burgers", "Sushi", "Desserts", "Vegan", "Asian Fusion"];
const emojis = ["🍕", "🍔", "🍣", "🍰", "🥗", "🍜"];
</script>

<style scoped>
.categories {
  background: #f0fff6;
  padding: 4rem 2rem;
  text-align: center;
}
.category-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
}
.category {
  background: white;
  width: 140px;
  height: 140px;
  border-radius: 16px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: transform 0.2s;
}
.category:hover {
  transform: scale(1.05);
}
.emoji {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}
</style>
