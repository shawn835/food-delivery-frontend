<template>
  <navbarHeader v-if="!$route.meta.hideLayout" />
  <RouterView />
</template>

<script setup>
import navbarHeader from "./components/navbarHeader.vue";
</script>
