<template>
  <navbarHeader v-if="!$route.meta.hideLayout" />
  <RouterView />
  <AppFooter />
</template>

<script setup>
import navbarHeader from "./components/Global/navbarHeader.vue";
import { useUserStore } from "./store/userStore";
import { fetchUser } from "./composables/authUser";
import AppFooter from "./components/Global/AppFooter.vue";
import { onMounted } from "vue";

onMounted(async () => {
  const userStore = useUserStore();
  const currentUser = await fetchUser();
  if (currentUser) {
    userStore.setUser(currentUser);
  } else {
    userStore.clearUser();
  }
});
</script>
