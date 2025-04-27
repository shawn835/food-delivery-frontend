<template>
  <Home />
  <trendingMeals />
  <featured />
  <popularCats />
  <HowItWorks />
  <testimonials />
</template>

<script setup>
import Home from "@/components/Home/Hero.vue";
import Featured from "@/components/Home/featured.vue";
import HowItWorks from "@/components/Home/HowItWorks.vue";
import testimonials from "@/components/Home/testimonials.vue";
import trendingMeals from "@/components/Home/trendingMeals.vue";
import popularCats from "@/components/Home/popularCats.vue";
</script>
