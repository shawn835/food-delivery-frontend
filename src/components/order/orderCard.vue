<!-- OrderCard.vue -->
<template>
  <div class="order-card">
    <div class="order-header">
      <h3>Order #{{ order._id.slice(-6).toUpperCase() }}</h3>
      <span class="status" :class="order.status">{{ order.status }}</span>
    </div>

    <div class="order-meta">
      <p><strong>Date:</strong> {{ formatDate(order.timestamp.createdAt) }}</p>
      <p><strong>Total:</strong> KES {{ order.payment.amount }}</p>
    </div>

    <button @click="$emit('viewDetails')">View Details</button>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
const { order } = defineProps(["order"]);

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString();
}
</script>

<style scoped>
.order-card {
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 10px;
  margin-bottom: 1rem;
  background: #fff;
}
.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.status {
  padding: 4px 8px;
  border-radius: 5px;
  text-transform: capitalize;
  font-size: 0.85rem;
  font-weight: 600;
}
.status.completed {
  background-color: #2ecc71;
  color: white;
}
.status.pending {
  background-color: #f39c12;
  color: white;
}
.status.cancelled {
  background-color: #e74c3c;
  color: white;
}
</style>
