<template>
  <accountHamburger :menuItems="userMenu" />
</template>

<script setup>
import accountHamburger from "../Global/accountHamburger.vue";

const userMenu = [
  { label: "Profile", route: "/account" },
  { label: "My Orders", route: "/order-history" },
  { label: "Favourites", route: "/favourites" },
  { label: "Logout", action: "logout" }, // optional, or call a function
];
</script>
