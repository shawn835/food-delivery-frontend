<!-- OrderDetailsModal.vue -->
<template>
  <div class="modal-overlay">
    <div class="modal">
      <button class="close" @click="$emit('close')">&times;</button>
      <h3>Order Details</h3>

      <p><strong>ID:</strong> {{ order._id }}</p>
      <p><strong>Date:</strong> {{ formatDate(order.timestamp.createdAt) }}</p>
      <p><strong>Status:</strong> {{ order.status }}</p>

      <ul class="meal-list">
        <li v-for="meal in order.items" :key="meal.id" class="meal-item">
          <img :src="meal.imageUrl" :alt="meal.name" class="meal-img" />
          <div class="meal-info">
            <p>
              <strong>{{ meal.name }}</strong>
            </p>
            <p>Qty: {{ meal.quantity }}</p>
            <p>Subtotal: KES {{ meal.subtotal }}</p>
          </div>
        </li>
      </ul>

      <p><strong>Total:</strong> KES {{ order.payment.amount }}</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
const { order } = defineProps(["order"]);
function formatDate(dateStr) {
  return new Date(dateStr).toLocaleString();
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  width: 90%;
  max-width: 600px;
  position: relative;
}
.close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}
.meal-list {
  margin: 1.5rem 0;
  list-style: none;
  padding: 0;
}
.meal-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 1rem;
}
.meal-img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
}
.meal-info p {
  margin: 0.2rem 0;
}
</style>
