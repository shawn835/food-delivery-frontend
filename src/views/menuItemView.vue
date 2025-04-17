<template>
  <div class="menu-type-page">
    <!-- Hero Section -->
    <section class="hero">
      <h1 class="title">{{ route.params.category }}</h1>
      <p class="subtitle">
        Delicious choices for your
        {{ route.params.category.toLowerCase() }} cravings!
      </p>
    </section>

    <!-- Category Belt -->
    <section class="category-belt">
      <button v-for="category in categories" :key="category.name">
        {{ category.name }}
      </button>
    </section>

    <!-- Meals Section -->
    <section class="meals">
      <mealCard v-for="meal in meals" :key="meal.id" :meal="meal" />
    </section>
  </div>
</template>

<script setup>
import { onMounted, watch, computed, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { useMenuData } from "@/composables/useMenudata";
import mealCard from "@/components/mealCard.vue";
const route = useRoute();
const { fetchMenuData, categories, isLoading, error } = useMenuData();

onMounted(async () => {
  await fetchMenuData(route.params.menuType);
});

watch(
  () => route.params.menuType,
  async (newType) => {
    await fetchMenuData(newType);
  }
);

// Safely handle possibly missing category param
const meals = computed(() => {
  const paramSlug = route.params.category?.toLowerCase() || "";
  return categories.value.find((cat) => cat.slug === paramSlug)?.meals || [];
});

watchEffect(() => console.log(categories.value));
</script>

<style scoped>
.menu-type-page {
  padding: 1rem;
}
.hero {
  text-align: center;
  margin-bottom: 1.5rem;
}
.category-belt {
  display: flex;
  overflow-x: auto;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
.category-belt button {
  padding: 0.5rem 1rem;
  border: none;
  background: #f3f3f3;
  cursor: pointer;
}
.category-belt button.active {
  background: #222;
  color: #fff;
}
.meals {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}
</style>
