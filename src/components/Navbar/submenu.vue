<template>
  <ul class="navbar-navs">
    <li class="back-button" @click="backToMainMenu">‹ Back</li>
    <li v-for="category in activeCategories.slice(0, 6)" :key="category.name">
      <router-link
        :to="`/menu/${activeMobileMenuType.toLowerCase()}/${slugify(
          category.name
        )}`">
        {{ category.name }}
      </router-link>
    </li>
    <li v-if="activeCategories.length > 6" class="view-more">View More →</li>
  </ul>
</template>

<script setup>
import slugify from "slugify";

const props = defineProps({
  activeMobileMenuType: String,
  activeCategories: Array,
});

const emit = defineEmits(["back"]);

const backToMainMenu = () => {
  emit("back");
};
</script>
