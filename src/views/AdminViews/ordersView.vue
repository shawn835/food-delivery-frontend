<template>
  <div class="orders-container">
    <!-- Search Bar -->
    <div class="search-container">
      <input
        v-model="searchQuery"
        @input="fetchOrders"
        type="text"
        placeholder="Search by Order ID, Phone, or Status"
        class="search-input" />
    </div>

    <!-- Orders Table -->
    <table class="orders-table">
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Phone</th>
          <th>Meals</th>
          <th>Total</th>
          <th>Status</th>
          <th>Time</th>
          <th>actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.orderId">
          <td>{{ order.orderId }}</td>
          <td>{{ order.delivery.phone }}</td>
          <td>
            <ul>
              <li v-for="meal in order.items" :key="meal.name">
                {{ meal.quantity }}x {{ meal.name }}
              </li>
            </ul>
          </td>
          <td>{{ order.payment.amount }}</td>
          <td>
            <span class="status" :class="order.payment.status">{{
              order.payment.status
            }}</span>
          </td>
          <td>{{ new Date(order.timestamp.createdAt).toLocaleString() }}</td>
          <td>
            <button @click="viewOrder(order.orderId)">View</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination Controls -->
    <div class="pagination-controls">
      <button
        @click="changePage(currentPage - 1)"
        :disabled="currentPage === 1">
        Previous
      </button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button
        @click="changePage(currentPage + 1)"
        :disabled="currentPage === totalPages">
        Next
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";

const currentPage = ref(1);
const perPage = 10;
const searchQuery = ref("");
const orders = ref([]);
const totalPages = ref(1);

// Actual fetch logic
const fetchOrders = async () => {
  const filters = {
    searchQuery: searchQuery.value,
  };

  const response = await fetch(`${import.meta.env.VITE_API_URL}/getallorders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      page: currentPage.value,
      perPage,
      filters,
    }),
  });

  const data = await response.json();
  if (response.ok) {
    orders.value = data.orders;
    totalPages.value = data.totalPages;
    console.log("Orders fetched:", orders.value);
  } else {
    console.error("Error fetching orders:", data.message);
  }
};

// Debounce utility
function debounce(func, delay) {
  let timeout;
  return function (...args) {
    console.log("Debounce triggered, waiting", delay, "ms");
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// Create debounced version
const debouncedFetchOrders = debounce(async () => {
  try {
    currentPage.value = 1;
    await fetchOrders();
    console.log("DEBOUNCED FETCH FIRED");
  } catch (error) {
    console.error("Debounced fetch failed:", error);
  }
}, 50000);

// Watch search input
watch(
  searchQuery,
  (newQuery) => {
    debouncedFetchOrders();
  },
  { immediate: false }
);

// Change page
const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    fetchOrders();
  }
};

// Initial load
fetchOrders();
</script>

<style scoped>
.orders-container {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.search-container {
  margin-bottom: 20px;
}

.search-input {
  padding: 10px;
  width: 300px;
  font-size: 16px;
  border: 1px solid #ddd;
}

.orders-table {
  width: 100%;
  border-collapse: collapse;
}

.orders-table th,
.orders-table td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
}

.orders-table th {
  background-color: #f4f4f4;
}

.pagination-controls {
  margin-top: 20px;
  text-align: center;
}

.pagination-controls button {
  padding: 10px 20px;
  margin: 0 5px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

.pagination-controls button:disabled {
  background-color: #ccc;
}

.pagination-controls span {
  font-size: 16px;
  margin: 0 10px;
}

.status.pending {
  background: #f0ad4e;
}
.status.preparing {
  background: #5bc0de;
}
.status.delivered {
  background: #5cb85c;
}
</style>
