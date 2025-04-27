<!-- src/components/CartIcon.vue -->
<template>
  <li class="cart">
    <router-link to="/cart">
      <i class="fa-solid fa-cart-shopping"></i>
    </router-link>
    <span class="cart-total">{{ total }}</span>
  </li>
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
}

.cart-total {
  background: red;
  color: white;
  font-size: 12px;
  border-radius: 50%;
  padding: 2px 6px;
  position: absolute;
  top: -8px;
  right: -10px;
}
</style>
