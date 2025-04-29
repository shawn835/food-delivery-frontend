<!-- pages/Login.vue -->
<template>
  <authForm
    :title="'Welcome Back'"
    :buttonText="'Login'"
    :loading="loading"
    :loadingText="'logging in...'"
    :onSubmit="handleLogin">
    <template #inputs>
      <input v-model="email" type="email" placeholder="Email" required />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        required />
    </template>

    <template #footer>
      <p class="auth-link">
        Don’t have an account?
        <router-link to="/register">Register</router-link>
      </p>
    </template>
  </authForm>
</template>

<script setup>
import { ref } from "vue";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/userStore";
import authForm from "../utils/authForm.vue";
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
