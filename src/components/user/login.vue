<template>
  <div class="auth-container">
    <form class="auth-form" @submit.prevent="handleLogin">
      <h2>Login</h2>
      <input type="email" v-model="email" placeholder="Email" required />
      <input
        type="password"
        v-model="password"
        placeholder="Password"
        required />
      <button type="submit">Login</button>
      <p class="auth-link">
        Don't have an account?
        <router-link to="/register">Register</router-link>
      </p>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useToast } from "vue-toastification";
const toast = useToast();

const email = ref("");
const password = ref("");

const handleLogin = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
      credentials: "include", // important for session cookies
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "login failed");
    }

    toast.success(data.message || "logged in successfully!");
    password.value = "";
    email.value = "";
  } catch (err) {
    toast.error(err.message || "Something went wrong");
  }
};
</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 90vh;
  padding: 2rem;
}
.auth-form {
  width: 100%;
  max-width: 400px;
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.auth-form h2 {
  text-align: center;
  margin-bottom: 1rem;
}
.auth-form input {
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 8px;
}
.auth-form button {
  background-color: #1e90ff;
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
</style>
