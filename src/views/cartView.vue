<template>
  <div class="cart-container">
    <h2>Your Cart</h2>

    <div v-if="cartItems.length === 0" class="empty">Cart is empty 🍽️</div>

    <div v-else>
      <div v-for="item in cartItems" :key="item.id" class="cart-item">
        <img :src="item.mealImage" :alt="item.name" class="cart-img" />

        <div class="cart-info">
          <h3 class="meal-name">{{ item.mealName }}</h3>
          <p class="meal-price">KES {{ item.price.toFixed(2) }}</p>
          <qualityControl :meal="item" />

          <button
            class="remove-btn"
            @click="cart.removeItemCompletely(item.id)">
            Remove
          </button>
        </div>
      </div>

      <div class="cart-footer">
        <p class="total">Total:KES {{ cart.totalPrice.toFixed(2) }}</p>
        <router-link to="/checkout">
          <button class="checkout-btn">Proceed to Checkout</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from "@/store/store";
import qualityControl from "@/components/qualityControl.vue";
import { computed } from "vue";

const cart = useCartStore();
const cartItems = computed(() => cart.cartItems);
</script>

<style scoped>
.cart-container {
  padding: 1rem;
  max-width: 600px;
  margin: auto;
}
.empty {
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
}
.cart-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #ddd;
  padding-bottom: 1rem;
}
.cart-img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
}
.cart-info {
  flex: 1;
}
.meal-name {
  margin: 0;
  font-size: 1.1rem;
}
.meal-price {
  color: #d93025;
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0.2rem 0 0.5rem;
}
.remove-btn {
  background-color: #eee;
  border: none;
  padding: 4px 8px;
  font-size: 0.9rem;
  cursor: pointer;
  color: #555;
  border-radius: 4px;
}
.remove-btn:hover {
  color: red;
}
.cart-footer {
  border-top: 1px solid #ddd;
  padding-top: 1rem;
  text-align: right;
}
.total {
  font-size: 1.3rem;
  margin-bottom: 1rem;
  font-weight: bold;
}
.checkout-btn {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}
.checkout-btn:hover {
  background-color: #218838;
}
</style>
