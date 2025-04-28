<!-- src/components/UserProfile.vue -->
<template>
  <div class="profile-info">
    <ul>
      <li v-if="user" class="profile" @click="toggleMenu">
        <i class="fa-solid fa-user"></i>
        {{ user.name?.split(" ")[0] || "Profile" }}
      </li>
      <li v-else class="profile">
        <router-link to="/login">
          <i class="fa-solid fa-user"></i> Login
        </router-link>
      </li>
      <li v-if="user && user.role === 'admin'" class="admin">
        <router-link to="/admin">Admin</router-link>
      </li>

      <template v-if="!isMobile">
        <cart />
      </template>
    </ul>

    <div class="menu-drawer" v-if="showMenu">
      <div
        v-for="item in userMenu"
        :key="item.label"
        class="menu-item"
        @click="handleUserClick(item, router, toggleMenu)">
        <span>{{ item.label }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "vue-router";
import { handleUserClick, userMenu } from "@/composables/useUserMenu";
import cart from "./cart.vue";
import { useMenu } from "@/composables/useMenu";
const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const router = useRouter();
const { isMobile } = useMenu();

const props = defineProps({
  menuItems: Array,
});

const showMenu = ref(false);
const toggleMenu = () => (showMenu.value = !showMenu.value);
</script>

<style scoped>
.profile-info {
  position: relative;
  z-index: 1000;
}
.profile,
.admin {
  font-weight: 500;
}

.menu-drawer {
  position: absolute;
  top: 2.5rem;
  right: 0;
  border: 1px solid var(--);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  min-width: 150px;
  background: var(--main-background);
  z-index: 10000;
}
.menu-item {
  display: block;
  padding: 0.75rem 1rem;
  text-decoration: none;
  color: var(--text-base);
  transition: background 0.3s;
  cursor: pointer;
}
.menu-item:hover {
  background-color: var(--secondary-text);
}

ul {
  display: flex;
  gap: 20px;
  align-items: center;
}

.profile {
  cursor: pointer;
}
</style>
