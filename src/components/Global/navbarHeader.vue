<template>
  <TopBar v-show="scrollY < threshold" />
  <navBar :fixed="scrollY > threshold" />
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import TopBar from "../Navbar/TopBar.vue";
import navBar from "../Navbar/navBar.vue";

const scrollY = ref(0);
const threshold = 50;

const handleScroll = () => {
  scrollY.value = window.scrollY;
};

const scrollHandler = () => requestAnimationFrame(handleScroll);

onMounted(() => {
  window.addEventListener("scroll", scrollHandler);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", scrollHandler);
});
</script>
