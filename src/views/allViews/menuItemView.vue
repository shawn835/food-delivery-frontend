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
      <router-link
        v-for="category in categories"
        :key="category.slug"
        :to="`/menu/${route.params.menuType}/${category.slug}`"
        class="category-button"
        :class="{ active: category.slug === computedCategorySlug }">
        {{ category.name }}
      </router-link>
    </section>

    <!-- Meals Section -->
    <section class="meals">
      <mealCard v-for="meal in meals" :key="meal.id" :meal="meal" />
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watchEffect, watch } from "vue";
import { useRoute } from "vue-router";
import mealCard from "@/components/utils/mealCard.vue";
import { useMenuStore } from "@/store/menuStore";

import { fetchMeals } from "@/composables/useMenudata";

const route = useRoute();
const categories = ref([]);
const meals = ref([]);
const menuStore = useMenuStore();
const computedMenuType = computed(() => route.params.menuType);

const computedCategorySlug = computed(
  () => route.params.category?.toLowerCase() || ""
);

// Fetch categories for a menuType
const loadCategories = async (menuType) => {
  const menuTypeCategories = await menuStore.fetchCategories(menuType);
  if (menuTypeCategories) {
    categories.value = menuTypeCategories;
  } else {
    console.error("Failed to fetch categories for menu type:", menuType);
  }
};

// Fetch meals for selected category
const loadMeals = async (categorySlug) => {
  if (!categorySlug) return;
  const mealsForCategory = await fetchMeals(categorySlug);
  meals.value = mealsForCategory.meals || [];
};

// Initial load
onMounted(async () => {
  await loadCategories(computedMenuType.value);
  await loadMeals(computedCategorySlug.value);
});

// Watch for changes in menuType to refetch categories
watch(
  () => route.params.menuType,
  async (newMenuType) => {
    await loadCategories(newMenuType);
  }
);

// Watch for changes in category to refetch meals
watch(
  () => route.params.category,
  async (newCategorySlug) => {
    await loadMeals(newCategorySlug?.toLowerCase());
  }
);
</script>

<style scoped>
.menu-type-page {
  padding: 1rem;
}

/* Hero Section */
.hero {
  text-align: center;
  margin-bottom: 1.5rem;
  padding: 0 1rem;
}

/* Category Belt */
.category-belt {
  display: flex;
  overflow-x: auto;
  gap: 0.5rem;
  margin-bottom: 1rem;
  padding: 0 0.5rem;
  scrollbar-width: none;
}

.category-belt::-webkit-scrollbar {
  display: none;
}

.category-button {
  flex-shrink: 0;
  white-space: nowrap;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  border: 1px solid #ccc;
  background-color: #f8f8f8;
}

.category-button.active {
  background-color: #333;
  color: #fff;
  font-weight: bold;
}

/* Meals Section */
.meals {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1rem;
  padding: 1rem;
  justify-items: center;
}
</style>
