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
        <span v-if="isMobile" class="chevron"
          ><i class="fas fa-chevron-right"></i
        ></span>
        <div v-if="hoveredMenuType === type.name" class="dropdown">
          <ul>
            <li v-for="category in activeCategories" :key="category.name">
              <router-link
                :to="`/menu/${type.name.toLowerCase()}/${slugify(
                  category.name
                )}`">
                {{ category.name }}
              </router-link>
            </li>
          </ul>
        </div>
      </li>
    </template>

    <template v-else>
      <h5
        v-if="isMobile"
        @click="backToMainMenu"
        role="button"
        aria-label="Go back to main menu"
        class="active-menutype">
        <i class="fas fa-arrow-left"></i> {{ activeMobileMenutype }}
      </h5>

      <li v-for="category in activeCategories" :key="category.name">
        <router-link
          :to="`/menu/${activeMobileMenutype.toLowerCase()}/${slugify(
            category.name
          )}`">
          {{ category.name }}
        </router-link>
      </li>
    </template>

    <template v-if="isMobile && !activeMobileMenutype && userStore.user">
      <h4 class="account-title">Account</h4>
      <!-- User Menu -->
      <li
        v-for="item in userMenu"
        :key="item.label"
        @click="handleUserClick(item, router)"
        class="nav-item">
        <span>{{ item.label }}</span>
      </li>
    </template>
  </ul>

  <template v-if="!isMobile">
    <UserProfile />
  </template>
  <template v-if="isMobile">
    <h5 v-if="!userStore.user">
      <router-link to="/login">
        <i class="fa-solid fa-user"></i> Login
      </router-link>
    </h5>

    <cart />
  </template>
</template>

<script setup>
import slugify from "slugify";
import { storeToRefs } from "pinia";
import { useMenuStore } from "@/store/menuStore";
import { useMenu } from "@/composables/useMenu";
import { useRouter, useRoute } from "vue-router";
import Cart from "./cart.vue";
import UserProfile from "@/components/Navbar/userProfile.vue";
import { useUserStore } from "@/store/userStore";
import { userMenu, handleUserClick } from "@/composables/useUserMenu";

defineProps(["isOpen"]);
const emit = defineEmits(["close-menu"]);
const router = useRouter();
const userStore = useUserStore();
const route = useRoute();

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
  top: 0;
  right: 0;
  color: black;
  font-size: 1.5rem;
  border-bottom: 1px solid var(--secondary-icon-color);
  display: none;
  cursor: pointer;
  margin-bottom: 1rem;
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
    left: 0;
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
    overflow-y: scroll;
    overflow-x: hidden;
  }

  li {
    width: 100%;
    font-size: 1.1rem;
    border-bottom: 1px solid grey;
  }

  .open {
    opacity: 1;
    visibility: visible;
  }

  .account-title {
    margin-top: 0.5rem;
    font-size: 1rem;
    font-weight: bold;
    color: #333;
    border-bottom: 3px solid var(--text-base);
    width: 100%;
    color: var(--primary-action);
  }

  .active-menutype {
    color: var(--primary-action);
    font-size: 1.3rem;
    cursor: pointer;
    width: 100%;
  }
}
</style>
