<template>
  <section class="hero">
    <div class="hero-content">
      <h1>CityEats – Fast, Local, Delicious</h1>
      <p>
        Order from the best restaurants in your city. Lightning-fast delivery,
        always hot.
      </p>
      <button>Get Started</button>
    </div>
  </section>
</template>

<script setup></script>

<style scoped>
.hero {
  width: 100%;
  min-height: 90vh;
  background: url("https://images.unsplash.com/photo-1600891964599-f61ba0e24092")
    no-repeat center center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
}
.hero-content {
  background-color: rgba(0, 0, 0, 0.6);
  padding: 3rem;
  border-radius: 16px;
}
.hero h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}
.hero p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
}
.hero button {
  padding: 0.8rem 2rem;
  font-size: 1rem;
  border: none;
  background-color: #ff4d4d;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease;
}
.hero button:hover {
  background-color: #e60000;
}
</style>
