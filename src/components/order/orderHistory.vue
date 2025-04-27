<template>
  <div class="order-history">
    <h2 class="title">My Orders</h2>

    <div class="filter-controls">
      <!-- Optional: Filter by status, date, etc. -->
    </div>

    <div v-if="orders.length">
      <orderCard
        v-for="order in sortedOrders"
        :key="order._id"
        :order="order"
        @viewDetails="openModal(order)" />
    </div>
    <p v-else>No orders yet, let's fix that 🍕</p>

    <OrderDetailsModal
      v-if="selectedOrder"
      :order="selectedOrder"
      @close="selectedOrder = null" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import orderCard from "./orderCard.vue";
import OrderDetailsModal from "./OrderDetailsModal.vue";
const orders = ref([]);
const selectedOrder = ref(null);

const openModal = (order) => {
  selectedOrder.value = order;
};

const sortedOrders = computed(() => {
  return [...orders.value].sort((a, b) => new Date(b.date) - new Date(a.date));
});

const fetchOrders = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/orderhistory`,
      {
        credentials: "include",
      }
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch orders");
    }

    const { userOrders } = data;
    orders.value = userOrders;
  } catch (error) {
    console.error("Fetch error:", error.message);
  }
};

onMounted(async () => {
  await fetchOrders();
});
</script>

<style scoped>
.order-history {
  padding: 2rem;
  max-width: 800px;
  margin: auto;
}
.title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}
.filter-controls {
  margin-bottom: 1rem;
  display: flex;
  gap: 1rem;
}
</style>
