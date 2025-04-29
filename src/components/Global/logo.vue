<!-- Logo.vue -->
<template>
  <div class="logo-wrapper">
    <router-link to="/"><h3 class="logo-text">City Eats</h3></router-link>
    <p class="tagline">Food at your fingertips</p>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,700&family=Raleway:wght@300;600&display=swap");

.logo-wrapper {
  text-align: center;
}

.logo-text {
  font-family: "Playfair Display", serif;
  font-style: italic;
  font-weight: 700;
  cursor: pointer;
  background: linear-gradient(135deg, #d73030, #1e90ff, #90e0ef);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 2px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
}

.tagline {
  font-family: "Raleway", sans-serif;
  font-weight: 300;
  color: black;
  letter-spacing: 1px;
  font-size: 1rem;
  margin-top: -0.5rem;
}
</style>
