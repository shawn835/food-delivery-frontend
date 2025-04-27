<template>
  <div class="track-page">
    <h1>Track Your Order</h1>

    <div class="card order-summary">
      <h2>Order #{{ orderId }}</h2>
      <p><strong>Status:</strong> {{ currentStatusLabel }}</p>
      <p><strong>Estimated Delivery:</strong> {{ estimatedDelivery }}</p>
    </div>

    <div class="card status-tracker">
      <h2>Order Status</h2>
      <div class="status-steps">
        <div
          v-for="(step, index) in steps"
          :key="index"
          class="step"
          :class="{ active: index <= currentStep }">
          <div class="circle">{{ index + 1 }}</div>
          <p>{{ step }}</p>
        </div>
      </div>
    </div>

    <div class="card delivery-info">
      <h2>Delivery Info</h2>
      <p><strong>Name:</strong> {{ orderDetails.name }}</p>
      <p><strong>Phone:</strong> {{ orderDetails.phone }}</p>
      <p><strong>Address:</strong> {{ orderDetails.address }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const orderId = route.params.orderId;

// Dummy order data – replace with real API fetch
const orderDetails = ref({
  name: "John Doe",
  phone: "0712345678",
  address: "123, Nairobi",
});

const steps = ["Order Placed", "Preparing", "Out for Delivery", "Delivered"];
const currentStep = ref(2); // Example: currently "Out for Delivery"
const estimatedDelivery = "Today, 6:00 PM";

const currentStatusLabel = steps[currentStep.value];
</script>

<style scoped>
.track-page {
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
  font-family: sans-serif;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
}

.card {
  background: #fff;
  border: 1px solid #eee;
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.status-tracker .status-steps {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
  padding: 1rem 0;
}

.status-tracker .status-steps::before {
  content: "";
  position: absolute;
  top: 25px;
  left: 12px;
  right: 12px;
  height: 4px;
  background: #ccc;
  z-index: 1;
}

.step {
  text-align: center;
  flex: 1;
  position: relative;
  z-index: 2;
}

.step .circle {
  width: 30px;
  height: 30px;
  background: #ddd;
  border-radius: 50%;
  margin: 0 auto;
  line-height: 30px;
  font-weight: bold;
  color: #fff;
}

.step.active .circle {
  background: #28a745;
}

.step p {
  margin-top: 0.5rem;
  font-size: 0.9rem;
}

.order-summary p,
.delivery-info p {
  margin: 0.3rem 0;
}
</style>
