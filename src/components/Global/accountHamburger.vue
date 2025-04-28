<!-- HamburgerMenu.vue -->
<template>
  <div class="hamburger-wrapper" v-if="userStore.user">
    <button class="hamburger-icon" @click="toggleMenu">
      <svg width="24" height="24" viewBox="0 0 24 24">
        <path
          d="M3 6h18M3 12h18M3 18h18"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round" />
      </svg>
    </button>

    <div class="menu-drawer" v-if="showMenu">
      <div
        v-for="item in menuItems"
        :key="item.label"
        class="menu-item"
        @click="handleUserClick(item, router, toggleMenu)">
        <span>{{ item.label }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/userStore";
import { handleUserClick } from "@/composables/useUserMenu";
const props = defineProps({
  menuItems: Array,
});
const router = useRouter();
const userStore = useUserStore();

const showMenu = ref(false);
const toggleMenu = () => (showMenu.value = !showMenu.value);
</script>

<style scoped>
.hamburger-wrapper {
  z-index: 1000;
  position: relative;
}

.hamburger-icon {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  position: relative;
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
</style>
