<!-- src/components/CartIcon.vue -->
<template>
  <div class="cart">
    <router-link to="/cart">
      <i class="fa-solid fa-cart-shopping"></i>
    </router-link>
    <span class="cart-total">{{ total }}</span>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useCartStore } from "@/store/cartStore";

const cart = useCartStore();
const total = computed(() => cart.totalItems());
</script>

<style scoped>
/* src/styles/cartIcon.css */
.cart {
  position: relative;
  font-size: 1.2rem;
}

.cart-total {
  background: red;
  color: white;
  font-size: 12px;
  border-radius: 50%;
  padding: 1px 4px;
  position: absolute;
  top: -8px;
  right: -10px;
}
</style>
