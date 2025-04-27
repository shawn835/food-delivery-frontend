import { defineStore } from "pinia";
import { ref } from "vue";

export const useMenuStore = defineStore(
  "menu",
  () => {
    const menuTypes = ref([]);
    const categories = ref({});

    // Fetching menu types
    const fetchMenuTypes = async () => {
      const url = `${import.meta.env.VITE_API_URL}/menutypes`;
      try {
        const res = await fetch(url);
        const data = await res.json();
        const { types } = data;
        menuTypes.value = types || [];
      } catch (err) {
        console.error("Error loading menu types", err);
      }
    };

    const fetchCategories = async (menuType) => {
      const key = menuType.toLowerCase();

      // If categories no need to fetch
      if (categories.value[key]) return categories.value[key];

      const url = `${import.meta.env.VITE_API_URL}/categories/${key}`;
      try {
        const res = await fetch(url);
        const data = await res.json();
        const { menutypeCategories } = data;
        categories.value[key] = menutypeCategories || [];
        return menutypeCategories;
      } catch (err) {
        console.error("Error loading categories for", menuType, err);
        return [];
      }
    };

    return {
      menuTypes,
      categories,
      fetchMenuTypes,
      fetchCategories,
    };
  },
  { persist: true }
);
