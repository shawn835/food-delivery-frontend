<template>
  <section class="carousel">
    <h2>🔥 Trending Meals</h2>
    <div class="carousel-container">
      <!-- Left Arrow -->
      <button
        class="carousel-arrow carousel-arrow-left"
        @click="slideLeft"
        :disabled="currentIndex === 0"
        aria-label="Previous meals">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor">
          <path d="M15 18l-6-6 6-6" stroke-width="2" />
        </svg>
        <i class="fas fa-chevron-left"></i>
      </button>
      <!-- Carousel Viewport -->
      <div class="carousel-viewport">
        <div
          class="carousel-track"
          :style="{ transform: `translateX(-${currentIndex * itemWidth}%)` }">
          <mealCard
            v-for="meal in trendingMeals"
            :key="meal.id"
            :meal="meal"
            class="carousel-item" />
        </div>
      </div>
      <!-- Right Arrow -->
      <button
        class="carousel-arrow carousel-arrow-right"
        @click="slideRight"
        :disabled="currentIndex >= maxIndex"
        aria-label="Next meals">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor">
          <path d="M9 18l6-6-6-6" stroke-width="2" />
        </svg>
        <i class="fas fa-chevron-right"></i>
      </button>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref, computed, onUnmounted } from "vue";
import mealCard from "../utils/mealCard.vue";

const trendingMeals = ref([]);

const fetchTrendingMeals = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/trendymeals`);
    const data = await response.json(); // Corrected here, parsing the response body
    if (response.ok) {
      const { mealTypes } = data;
      trendingMeals.value = mealTypes;
    } else {
      console.error(data.message || "failed to fetch trending meals");
    }
  } catch (error) {
    console.error("something went wrong:", error);
  }
};

onMounted(async () => {
  fetchTrendingMeals();
});

// Carousel state
const currentIndex = ref(0); //slide index
const visibleItems = ref(window.innerWidth <= 768 ? 2 : 4); // 4 on desktop, 2 on mobile
const itemWidth = computed(() => 100 / visibleItems.value); // Width per item (25% for 4, 50% for 2)
const maxIndex = computed(() =>
  Math.max(0, trendingMeals.value.length - visibleItems.value)
); // Max index to prevent empty space

// Navigation methods
const slideLeft = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  }
};

const slideRight = () => {
  if (currentIndex.value < maxIndex.value) {
    currentIndex.value++;
  }
};

// Update visibleItems on window resize
const updateVisibleItems = () => {
  visibleItems.value = window.innerWidth <= 768 ? 2 : 4;
  // Reset currentIndex if it exceeds maxIndex after resize
  if (currentIndex.value > maxIndex.value) {
    currentIndex.value = maxIndex.value;
  }
};

// Add/remove resize event listener
onMounted(() => window.addEventListener("resize", updateVisibleItems));
onUnmounted(() => window.removeEventListener("resize", updateVisibleItems));
</script>

<style scoped>
.carousel {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.carousel h2 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  text-align: center;
}

.carousel-container {
  position: relative;
  display: flex;
  align-items: center;
}

.carousel-viewport {
  overflow: hidden;
  width: 100%;
}

.carousel-track {
  display: flex;
  transition: transform 0.3s ease-in-out;
}

.carousel-item {
  flex: 0 0 25%;
  padding: 0 0.5rem;
  box-sizing: border-box;
}

.carousel-arrow {
  position: absolute;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: background 0.2s;
}

.carousel-arrow:hover:not(:disabled) {
  background: rgba(0, 0, 0, 0.9);
}

.carousel-arrow-left {
  left: 10px;
}

.carousel-arrow-right {
  right: 10px;
}

.carousel-arrow:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.carousel-arrow svg {
  width: 20px;
  height: 20px;
}

@media (max-width: 768px) {
  .carousel-item {
    flex: 0 0 50%; /* 2 items on mobile (100% / 2) */
  }
}
</style>
