<template>
  <ul class="navbar-navs user-actions">
    <li class="cart">
      <router-link to="/cart">
        <i class="fa-solid fa-cart-shopping"></i>
      </router-link>
      <span class="cart-total">{{ total }}</span>
    </li>

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

    <li>
      <loggedInUserMenu />
    </li>
  </ul>
</template>

<script setup>
import { useCartStore } from "@/store/cartStore";
import { useUserStore } from "@/store/userStore";
import { storeToRefs } from "pinia";
import loggedInUserMenu from "../user/loggedInUserMenu.vue";

const cart = useCartStore();
const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const total = cart.totalItems;
</script>

<style scoped>
/* CART */
.cart {
  position: relative;
}

.cart-total {
  background: red;
  color: white;
  font-size: 12px;
  border-radius: 50%;
  padding: 2px 6px;
  position: absolute;
  top: -8px;
  right: -10px;
}

/* PROFILE & ADMIN */
.profile,
.admin {
  font-weight: 500;
}
</style>
