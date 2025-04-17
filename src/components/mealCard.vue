<template>
  <div class="meal-card">
    <img :src="meal.mealImage" :alt="meal.mealName" class="meal-image" />

    <div class="meal-details">
      <div class="meal-title">
        <h3>{{ meal.mealName }}</h3>
        <button @click="toggleFav" class="fav-btn">
          <span v-if="isFav">❤️</span>
          <span v-else>🤍</span>
        </button>
      </div>

      <div class="meal-meta">
        <span class="price">ksh {{ meal.price ?? 1300 }} </span>
        <div class="rating">
          <span v-for="star in 5" :key="star" class="star">
            <span :class="{ filled: star <= Math.round(meal.rating ?? 4.5) }"
              >★</span
            >
          </span>
          <span class="rating-number">({{ meal.rating ?? "4.5" }})</span>
        </div>
      </div>

      <div v-if="meal.tags?.length" class="tags">
        <span v-for="tag in meal.tags" :key="tag" class="tag">{{ tag }}</span>
      </div>

      <div class="order-btns">
        <button v-if="!quantity" @click="cart.addToCart(meal)" class="add-btn">
          Add to Cart
        </button>
        <qualityControl v-else :meal="meal" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import qualityControl from "./qualityControl.vue";
import { useCartStore } from "@/store/store";
const cart = useCartStore();

const props = defineProps({
  meal: {
    type: Object,
    required: true,
    default: () => ({
      mealName: "",
      mealImage: "",
      price: "",
      rating: 4.5,
      tags: [],
    }),
  },
});

const isFav = ref(false);
const toggleFav = () => {
  isFav.value = !isFav.value;
};

const quantity = computed(() => cart.getQuantity(props.meal.id));
</script>

<style scoped>
.meal-card {
  width: 260px;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid #ddd;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  background: #fff;
  transition: transform 0.2s ease;
}
.meal-card:hover {
  transform: translateY(-4px);
}

.meal-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.meal-details {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.meal-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.meal-title h3 {
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
  line-height: 1.2em;
  max-height: 2.4em;
  overflow: hidden;
}

.fav-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
}

.meal-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price {
  font-weight: bold;
  font-size: 1rem;
}

.rating {
  display: flex;
  align-items: center;
  gap: 2px;
  font-size: 0.85rem;
  color: #f59e0b;
}

.star {
  font-size: 1rem;
  color: #ccc;
}

.star .filled {
  color: #f59e0b;
}

.rating-number {
  margin-left: 4px;
  font-size: 0.75rem;
  color: #666;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 4px;
}

.tag {
  background-color: #eee;
  padding: 4px 8px;
  font-size: 0.75rem;
  border-radius: 12px;
}

.order-btns {
  width: 100%;
}

.add-btn {
  margin-top: auto;
  padding: 8px;
  background-color: #10b981;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: background 0.2s;
  width: 100%;
}

.add-btn:hover {
  background-color: #059669;
}
</style>
