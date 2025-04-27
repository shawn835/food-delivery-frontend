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
      <button type="submit" :disabled="loading" class="secondary-btn">
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
          redirecting...
        </span>

        <span v-else> login </span>
      </button>
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
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/userStore";
const toast = useToast();
const router = useRouter();
const userStore = useUserStore();

const email = ref("");
const password = ref("");
const loading = ref(false);

const handleLogin = async () => {
  loading.value = true;
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "login failed");
    }

    const { owner } = data;
    userStore.setUser(owner);

    toast.success(data.message || "logged in successfully!");
    password.value = "";
    email.value = "";

    setTimeout(() => {
      router.push("/");
    }, 2000);
  } catch (err) {
    toast.error(err.message || "Something went wrong");
    loading.value = false;
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

.spinner {
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
  margin-right: 10px;
}

.path {
  stroke: #fff;
  stroke-linecap: round;
  animation: dash 1.5s ease-in-out infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.login-btn:disabled {
  background-color: #bdc3c7;
  cursor: not-allowed;
}

.auth-link {
  text-align: center;
  font-size: 0.9rem;
}
</style>
