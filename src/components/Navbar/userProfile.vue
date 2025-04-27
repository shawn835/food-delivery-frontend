<!-- src/components/UserProfile.vue -->
<template>
  <li v-if="user" class="profile">
    <router-link to="/account">
      <i class="fa-solid fa-user"></i>
      {{ user.name?.split(" ")[0] || "Profile" }}
    </router-link>
  </li>
  <li v-else class="profile">
    <router-link to="/login">
      <i class="fa-solid fa-user"></i> Login
    </router-link>
  </li>
  <li v-if="user && user.role === 'admin'" class="admin">
    <router-link to="/admin">Admin</router-link>
  </li>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useUserStore } from "@/store/userStore";

const userStore = useUserStore();
const { user } = storeToRefs(userStore);
</script>

<style scoped>
/* src/styles/userProfile.css */
.profile,
.admin {
  font-weight: 500;
}
</style>
