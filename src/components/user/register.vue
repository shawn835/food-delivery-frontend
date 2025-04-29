<!-- pages/Register.vue -->
<template>
  <authForm
    :title="'Create Account'"
    :buttonText="'Register'"
    :loading="loading"
    :loadingText="'redirecting to login...'"
    :onSubmit="handleRegister">
    <template #inputs>
      <input v-model="name" type="text" placeholder="Full Name" required />
      <input v-model="phone" type="tel" placeholder="Phone" required />
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="address" type="text" placeholder="Address" required />
      <input v-model="city" type="text" placeholder="City" required />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        required />
    </template>

    <template #footer>
      <p class="auth-link">
        Already have an account?
        <router-link to="/login">Login</router-link>
      </p>
    </template>
  </authForm>
</template>

<script setup>
import authForm from "../utils/authForm.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const name = ref("");
const phone = ref("");
const email = ref("");
const address = ref("");
const city = ref("");
const password = ref("");
const loading = ref(false);
const toast = useToast();
const router = useRouter();

const handleRegister = async () => {
  loading.value = true;
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name.value,
        phoneNumber: phone.value,
        email: email.value,
        address: address.value,
        city: city.value,
        password: password.value,
      }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Registration failed");

    toast.success(data.message || "Registered successfully!");
    setTimeout(() => router.push("/login"), 1500);
  } catch (err) {
    toast.error(err.message);
  } finally {
    loading.value = false;
  }
};
</script>
