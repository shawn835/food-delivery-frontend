<template>
  <div class="register-container">
    <div class="register-image">
      <img src="" alt="Welcome" />
    </div>
    <form class="register-form" @submit.prevent="handleRegister">
      <h2>Create Account</h2>
      <input v-model="name" type="text" placeholder="Full Name" required />
      <input v-model="phone" type="tel" placeholder="phone" required />
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="address" type="text" placeholder="address" required />
      <input v-model="city" type="city" placeholder="city" required />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        required />
      <button type="submit" class="primary-btn" :disabled="loading">
        <span v-if="loading">
          <svg
            class="spinner"
            viewBox="0 0 50 50"
            xmlns="http://www.w3.org/2000/svg">
            <circle
              class="path"
              cx="25"
              cy="25"
              r="20"
              fill="none"
              stroke-width="5" />
          </svg>
          redirecting to login...
        </span>
        <span v-else> register </span>
      </button>
      <p class="auth-link">
        Already have an account? <router-link to="/login">Login</router-link>
      </p>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
const toast = useToast();
const router = useRouter();

const name = ref("");
const email = ref("");
const password = ref("");
const phone = ref("");
const city = ref("");
const address = ref("");
const loading = ref(false);

const handleRegister = async () => {
  loading.value = true;
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
        name: name.value,
        phoneNumber: phone.value,
        address: address.value,
        city: city.value,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Registration failed");
    }

    toast.success(data.message || "Registered successfully!");
    setTimeout(() => {
      router.push("/login");
    }, 1500);

    // Reset form
    name.value = "";
    phone.value = "";
    password.value = "";
    email.value = "";
  } catch (err) {
    toast.error(err.message || "Something went wrong");
    loading.value = false;
  }
};
</script>

<style scoped>
.register-container {
  display: flex;
  min-height: 90vh;
  align-items: center;
  justify-content: center;
}
.register-image {
  flex: 1;
  display: none;
}
.register-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
}
.register-form {
  flex: 1;
  max-width: 450px;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.register-form h2 {
  text-align: center;
  margin-bottom: 1rem;
}
.register-form input {
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.auth-link {
  text-align: center;
  font-size: 0.9rem;
}

.spinner {
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
  margin-right: 10px;
}

.path {
  stroke: white;
  stroke-linecap: round;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Responsive */
@media (min-width: 768px) {
  .register-image {
    display: block;
  }
}
</style>
