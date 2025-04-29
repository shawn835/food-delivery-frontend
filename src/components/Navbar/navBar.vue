<template>
  <nav :class="['navbar', { fixed: fixed }]">
    <div class="container navbar-content">
      <logo />
      <hamburger @toggle-menu="isMenuOpen = true" />
      <navMenu :is-open="isMenuOpen" @close-menu="isMenuOpen = false" />
    </div>
  </nav>
</template>

<script setup>
import { ref } from "vue";
import hamburger from "../Global/hamburger.vue";
import navMenu from "./navMenu.vue";
import logo from "../Global/logo.vue";

const isMenuOpen = ref(false);

defineProps({
  fixed: Boolean,
});
</script>

<style scoped>
.navbar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding: 10px 0;
}

.navbar {
  transition: top 0.4s ease;
  background-color: #fff;
  z-index: 999;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: 100%;
}

.fixed {
  position: fixed;
  top: 0;
  animation: slideDown 0.4s forwards;
}

@keyframes slideDown {
  from {
    top: -30px;
  }
  to {
    top: 0;
  }
}

@media (max-width: 768px) {
  .navbar-content {
    justify-content: space-around;
    padding: 0;
  }
}
</style>
