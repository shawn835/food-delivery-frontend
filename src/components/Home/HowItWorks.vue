<template>
  <section class="how-it-works">
    <h2>How It Works</h2>
    <div class="steps">
      <div class="step">
        <div class="icon">📍</div>
        <h3>1. Enter Your Address</h3>
        <p>Find restaurants near your location in seconds.</p>
      </div>
      <div class="step">
        <div class="icon">🍱</div>
        <h3>2. Pick a Meal</h3>
        <p>Choose from dozens of cuisines and top-rated dishes.</p>
      </div>
      <div class="step">
        <div class="icon">🚴</div>
        <h3>3. Get It Delivered</h3>
        <p>Track your delivery in real-time. Hot and fast!</p>
      </div>
    </div>
  </section>
</template>

<script setup></script>

<style scoped>
.how-it-works {
  padding: 4rem 2rem;
  text-align: center;
  background-color: #fff5f0;
}
.how-it-works h2 {
  font-size: 2rem;
  margin-bottom: 2rem;
}
.steps {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
}
.step {
  flex: 1 1 250px;
  max-width: 300px;
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}
.icon {
  font-size: 2rem;
  margin-bottom: 1rem;
}
.step h3 {
  margin-bottom: 0.5rem;
}
.step p {
  font-size: 0.95rem;
}
</style>
