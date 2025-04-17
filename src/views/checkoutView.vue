<template>
  <div class="checkout-page">
    <h1>Checkout</h1>

    <!-- Order Summary -->
    <div class="card">
      <h2>Order Summary</h2>
      <div v-for="item in cartItems" :key="item.id" class="order-item">
        <div class="item-info">
          <div class="meal-image">
            <img :src="item.mealImage" :alt="item.mealName" />
          </div>
          <strong>{{ item.mealName }}</strong>
          <div class="quantity">Qty: {{ item.quantity }}</div>
        </div>
        <div class="price">
          Ksh {{ (item.price * item.quantity).toFixed(2) }}
        </div>
      </div>
      <div class="summary">
        <div>
          Subtotal: <strong>Ksh {{ subtotal.toFixed(2) }}</strong>
        </div>
        <div>
          Delivery: <strong>Ksh {{ deliveryFee }}</strong>
        </div>
        <div>
          Total:
          <strong class="total"
            >Ksh {{ (subtotal + deliveryFee).toFixed(2) }}</strong
          >
        </div>
      </div>
    </div>

    <!-- Delivery Info -->
    <div class="card">
      <h2>Delivery Details</h2>
      <form @submit.prevent>
        <input type="text" placeholder="Full Name" v-model="name" required />
        <input type="tel" placeholder="Phone Number" v-model="phone" required />
        <textarea
          placeholder="Delivery Address"
          v-model="address"
          required></textarea>
        <textarea
          placeholder="Delivery Instructions (optional)"
          v-model="instructions"></textarea>
      </form>
    </div>

    <!-- Payment Method -->
    <div class="card">
      <h2>Payment Method</h2>
      <select v-model="paymentMethod">
        <option value="mpesa">M-Pesa</option>
        <option value="airtel">Airtel Money</option>
        <option value="cod">Cash on Delivery</option>
      </select>
    </div>

    <!-- Place Order -->
    <div class="place-order">
      <button class="btn-order" @click="placeOrder">
        Place Order (Ksh {{ (subtotal + deliveryFee).toFixed(2) }})
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useCartStore } from "@/store/store";

const cart = useCartStore();
const cartItems = computed(() => cart.cartItems);
const subtotal = computed(() => cart.totalPrice);
const deliveryFee = 100;

const name = ref("");
const phone = ref("");
const address = ref("");
const instructions = ref("");
const paymentMethod = ref("mpesa");

const placeOrder = () => {
  if (!name.value || !phone.value || !address.value)
    return alert("Please fill all required fields");
  alert("Order placed!");
  // You could send all the data to backend here
};
</script>

<style scoped>
.checkout-page {
  max-width: 700px;
  margin: 2rem auto;
  padding: 1rem;
  font-family: sans-serif;
}
.meal-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
}

h1 {
  text-align: center;
  margin-bottom: 1.5rem;
}

.card {
  background: #fff;
  border: 1px solid #eee;
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.order-item {
  display: flex;
  justify-content: space-between;
  margin: 0.5rem 0;
  border-bottom: 1px dashed #ddd;
  padding-bottom: 0.5rem;
}

.item-info {
  display: flex;
  flex-direction: column;
}

.summary {
  margin-top: 1rem;
  font-size: 1.1rem;
}

.total {
  font-size: 1.2rem;
  color: #d9534f;
}

input,
textarea,
select {
  display: block;
  width: 100%;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.btn-order {
  width: 100%;
  background: #28a745;
  color: white;
  font-size: 1.2rem;
  padding: 1rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}

.btn-order:hover {
  background: #218838;
}
</style>
