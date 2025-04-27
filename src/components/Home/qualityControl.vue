<template>
  <div class="quantity-control">
    <button @click="decrease" class="qty-btn">-</button>
    <span class="qty">{{ quantity }}</span>
    <button @click="increase" class="qty-btn">+</button>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useCartStore } from "@/store/cartStore";
const props = defineProps({
  meal: Object,
});

const cart = useCartStore();

const quantity = computed(() => {
  return cart.getQuantity(props.meal.id);
});

const increase = computed(() => {
  cart.addToCart(props.meal);
});

const decrease = computed(() => {
  cart.removeFromCart(props.meal.id);
});
</script>

<style scoped>
.quantity-control {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.qty-btn {
  background-color: #eee;
  border: none;
  padding: 0.4rem 0.8rem;
  font-size: 1.2rem;
  cursor: pointer;
}
.qty {
  font-weight: bold;
}
</style>
