<template>
  <div class="checkout-page">
    <h1>Checkout</h1>

    <div class="checkout-grid">
      <!-- Left Column -->
      <div class="left">
        <!-- Order Summary -->
        <div class="card">
          <h2>Order Summary</h2>
          <div v-for="item in cartItems" :key="item.id" class="order-item">
            <div class="item-info">
              <strong>{{ item.name }}</strong>
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
              <strong class="total">Ksh {{ totalAmount.toFixed(2) }}</strong>
            </div>
          </div>
        </div>

        <!-- Payment Method -->
        <div class="card">
          <h2>Payment Method</h2>
          <select v-model="paymentMethod">
            <option value="mpesa">m-pesa</option>
            <option value="cash on delivery">cash on delivery</option>
            <option value="airtel">airtel money</option>
          </select>
        </div>
      </div>

      <!-- Right Column -->
      <div class="right">
        <!-- Delivery Info -->
        <div class="card">
          <h2>Delivery Details</h2>
          <form @submit.prevent>
            <input
              type="text"
              placeholder="Full Name"
              disabled
              v-model="name"
              required />
            <input
              type="tel"
              placeholder="Phone Number"
              disabled
              v-model="phone"
              required />
            <input
              type="text"
              placeholder="city"
              disabled
              v-model="city"
              required />
            <textarea
              placeholder="Delivery Address"
              v-model="address"
              disabled
              required></textarea>
            <textarea
              placeholder="Delivery Instructions (optional)"
              v-model="instructions"></textarea>
          </form>
        </div>

        <!-- Place Order -->
        <div class="place-order">
          <button class="btn-order secondary-btn" @click="placeOrder">
            Place Order (Ksh {{ totalAmount.toFixed(2) }})
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useCartStore } from "@/store/cartStore";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { useUserStore } from "@/store/userStore";
const toast = useToast();
const router = useRouter();
const userStore = useUserStore();

// Retrieve cart details from the store
const cart = useCartStore();
const cartItems = computed(() => cart.cartItems);
const subtotal = computed(() => cart.totalPrice);

// Delivery details
const name = ref(userStore?.user.name || "");
const phone = ref(userStore?.user.phone || "");
const city = ref(userStore?.user.city || "");
const address = ref(userStore?.user.address || "");
const instructions = ref("");

// Payment method
const paymentMethod = ref("mpesa");

// Static delivery fee and tax (optional, can be dynamic)
const deliveryFee = 100;

// Total Amount calculation
const totalAmount = computed(() => {
  return subtotal.value + deliveryFee;
});

// Place order function
const placeOrder = async () => {
  if (!name.value || !phone.value || !address.value)
    return toast.error("Please fill all required fields");

  const orderPayload = {
    items: cartItems.value.map((item) => ({
      itemId: item.id,
      quantity: item.quantity,
      price: item.price,
      subtotal: item.quantity * item.price,
      // notes: item.notes || "",
    })),
    payment: {
      method: paymentMethod.value,
      amount: totalAmount.value,
      status: "pending",
      deliveryFee: deliveryFee,
    },
    delivery: {
      name: name.value,
      phone: phone.value,
      city: city.value,
      address: address.value,
      deliveryNotes: instructions.value,
    },
  };

  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/order`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderPayload),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Something went wrong");

    toast.success(data.message || "order placed successfully!");
    const { orderId } = data;

    cart.clearCart();

    router.push(`/orders/track-order${orderId}`);
  } catch (err) {
    toast(err.message || "Failed to place order");
  }
};
</script>

<style scoped>
.checkout-page {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 1rem;
  font-family: sans-serif;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
}

.checkout-grid {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.left,
.right {
  flex: 1;
}
@media (min-width: 768px) {
  .checkout-grid {
    flex-direction: row;
    align-items: flex-start;
  }
}

.card {
  background: #fff;
  border: 1px solid #eee;
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  margin-bottom: 1rem;
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
  font-size: 1.3rem;
  color: #d9534f;
}
</style>
