<template>
  <div class="top-bar">
    <h5>
      <i class="fa-solid fa-location-dot"></i> No: 58 A, Ngara street,
      Kongongoni, NB, Kenya 100100
    </h5>
    <div class="phone">
      <strong> call <i class="fa-solid fa-phone"></i> +2543336666</strong>
    </div>
  </div>

  <nav>
    <div class="navbar">
      <div class="logo">
        <img src="" alt="cakes" />
      </div>
      <ul>
        <li
          v-for="type in menuTypes"
          :key="type"
          @mouseenter="handleHover(type)"
          @mouseleave="hoveredMenuType = null">
          {{ type }}

          <div v-if="hoveredMenuType === type" class="dropdown">
            <ul>
              <li
                v-for="category in activeCategories.slice(0, 6)"
                :key="category.name">
                <router-link
                  :to="`/menu/${type.toLowerCase()}/${slugify(category.name)}`">
                  {{ category.name }}
                </router-link>
              </li>
              <li v-if="activeCategories.length > 6">View More →</li>
            </ul>
          </div>
        </li>

        <li class="cart">
          <router-link to="/cart"
            ><i class="fa-solid fa-cart-shopping"></i
          ></router-link>

          <span class="cart-total">{{ total }}</span>
        </li>
        <li class="profile">
          <router-link to="/login"
            ><i class="fa-solid fa-user"></i> login</router-link
          >
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import slugify from "slugify";
import { computed, ref } from "vue";
import { fetchCategories } from "@/composables/useMenudata";
import { useCartStore } from "@/store/store";
const cart = useCartStore();

const total = computed(() => cart.totalItems());

const hoveredMenuType = ref(null);
const activeCategories = ref([]);

const menuTypes = [
  "Banquet",
  "Combos",
  "Specials",
  "Kids",
  "Desserts",
  "Drinks",
];

const handleHover = async (menuType) => {
  hoveredMenuType.value = menuType;
  activeCategories.value = await fetchCategories(menuType);
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
}
.navbar ul {
  display: flex;
  gap: 10px;
}

.navbar ul li {
  position: relative;
  font-size: 1.3rem;
  cursor: pointer;
}

.top-bar {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: var(--secondary-accent);
  color: var(--secondary-text);
}

nav {
  background-color: var(--primary-action);
  padding: 15px;
}

nav a {
  color: var(--main-background);
  margin: 0 15px;
  font-family: var(--font-accent);
  font-weight: 500;
}

/* Dropdown styles */
.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: var(--text-base);
  border: 1px solid #ccc;
  z-index: 10;
  display: none;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  overflow-y: scroll;
  overflow-x: hidden;
  max-height: 70vh;
}

.navbar li:hover .dropdown {
  display: block;
}
.dropdown ul {
  display: flex;
  flex-direction: column;
  align-items: start;
}

.dropdown li {
  padding: 10px;
  color: #333;
}

.dropdown li a:hover {
  color: var(--primary-action);
}

.cart i {
  position: relative;
  font-size: 30px;
}

.cart-total {
  position: absolute;
  top: -4px;
  right: 18px;
  font-size: 14px;
  color: var(--secondary-accent);
}

/* View More styles */
.dropdown li:last-child {
  text-align: center;
  font-weight: bold;
}
</style>
