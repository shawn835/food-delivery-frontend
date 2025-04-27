<template>
  <nav class="navbar">
    <div class="container navbar-content">
      <div class="logo">
        <img src="" alt="cakes" />
      </div>
      <hamburger @toggle-menu="isMenuOpen = true" />
      <navMenu :is-open="isMenuOpen" @close-menu="isMenuOpen = false" />
    </div>
  </nav>
</template>

<script setup>
import { ref } from "vue";
import hamburger from "../Global/hamburger.vue";
import navMenu from "./navMenu.vue";

const isMenuOpen = ref(false);
</script>

<style scoped>
.navbar {
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.navbar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding: 10px 0;
}

.logo img {
  height: 50px;
}
</style>
