<!-- src/components/NavMenu.vue -->
<template>
  <ul class="navbar-navs" :class="{ open: isOpen }">
    <div class="close-icon">
      <span @click="emit('close-menu')"><i class="fa-solid fa-xmark"></i></span>
    </div>

    <template v-if="!activeMobileMenutype">
      <li
        v-for="type in menuStore.menuTypes"
        :key="type.id"
        @mouseenter="handleHover(type.name)"
        @mouseleave="resetHover"
        @click="openMobileMenu(type.name)"
        class="nav-item">
        {{ type.name }}
        <span v-if="isMobile" class="chevron">›</span>
        <div v-if="hoveredMenuType === type.name" class="dropdown">
          <ul>
            <li
              v-for="category in activeCategories.slice(0, 6)"
              :key="category.name">
              <router-link
                :to="`/menu/${type.name.toLowerCase()}/${slugify(
                  category.name
                )}`">
                {{ category.name }}
              </router-link>
            </li>
            <li v-if="activeCategories.length > 6" class="view-more">
              View More →
            </li>
          </ul>
        </div>
      </li>
    </template>

    <template v-else>
      <li class="back-button" @click="backToMainMenu">‹ Back</li>
      <li v-for="category in activeCategories.slice(0, 6)" :key="category.name">
        <router-link
          :to="`/menu/${activeMobileMenutype.toLowerCase()}/${slugify(
            category.name
          )}`">
          {{ category.name }}
        </router-link>
      </li>
      <li v-if="activeCategories.length > 6" class="view-more">View More →</li>
    </template>

    <Cart />
    <UserProfile />
    <loggedInUserMenu />
  </ul>
</template>

<script setup>
import slugify from "slugify";
import { storeToRefs } from "pinia";
import { useMenuStore } from "@/store/menuStore";
import { useMenu } from "@/composables/useMenu";
import Cart from "./cart.vue";
import UserProfile from "@/components/Navbar/userProfile.vue";
import loggedInUserMenu from "../user/loggedInUserMenu.vue";

defineProps(["isOpen"]);
const emit = defineEmits(["close-menu"]);

const menuStore = useMenuStore();
const { menuTypes } = storeToRefs(menuStore);
const {
  isMobile,
  hoveredMenuType,
  activeMobileMenutype,
  activeCategories,
  handleHover,
  resetHover,
  openMobileMenu,
  backToMainMenu,
} = useMenu();
</script>

<style scoped>
/* src/styles/navMenu.css */
.navbar-navs {
  display: flex;
  list-style: none;
  align-items: center;
  gap: 20px;
  position: relative;
}

.navbar-navs li {
  position: relative;
}

.nav-item {
  cursor: pointer;
}

.navbar-navs a {
  text-decoration: none;
  color: #333;
  font-weight: 500;
}

.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 10px;
  display: flex;
  flex-direction: column;
  min-width: 150px;
  z-index: 100;
}

.dropdown ul {
  list-style: none;
}

.dropdown li {
  margin-bottom: 8px;
}

.dropdown li a {
  color: #333;
  text-decoration: none;
}

.close-icon {
  position: absolute;
  top: 10px;
  left: 10px;
  color: black;
  font-size: 1.5rem;
  border-bottom: 1px solid var(--secondary-icon-color);
  width: 100%;
  display: none;
  cursor: pointer;
}

@media (max-width: 768px) {
  .close-icon {
    display: block;
  }

  .navbar-navs {
    flex-direction: column;
    background: white;
    position: fixed;
    top: 0;
    right: 0;
    width: 300px;
    height: 100vh;
    padding: 20px;
    gap: 15px;
    z-index: 1000;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.4s ease, visibility 0.4s ease;
    align-items: start;
  }

  li {
    border-bottom: 1px solid red;
    width: 100%;
    font-size: 1.1rem;
  }

  .open {
    opacity: 1;
    visibility: visible;
  }

  .dropdown {
    position: static;
    box-shadow: none;
    padding-left: 10px;
  }

  .back-button {
    cursor: pointer;
  }
}
</style>
