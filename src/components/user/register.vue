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
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        required />
      <button type="submit">Register</button>
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

const handleRegister = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
        name: name.value,
        phoneNumber: phone.value,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Registration failed");
    }

    toast.success(data.message || "Registered successfully!");
    router.push("/login");

    // Reset form
    name.value = "";
    phone.value = "";
    password.value = "";
    email.value = "";
  } catch (err) {
    toast.error(err.message || "Something went wrong");
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
.register-form button {
  background-color: #28a745;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
.auth-link {
  text-align: center;
  font-size: 0.9rem;
}

/* Responsive */
@media (min-width: 768px) {
  .register-image {
    display: block;
  }
}
</style>
