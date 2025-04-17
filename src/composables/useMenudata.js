// composables/useMenuData.js
import { ref } from "vue";

export function useMenuData() {
  const categories = ref([]);
  const isLoading = ref(false);
  const error = ref(null);

  const fetchMenuData = async (menuType) => {
    const url = `${
      import.meta.env.VITE_API_URL
    }/api/menu/${menuType.toLowerCase()}`;
    console.log("Fetching full menu data from:", url);

    isLoading.value = true;
    try {
      const res = await fetch(url);
      const data = await res.json();
      categories.value = data.categories || [];
    } catch (err) {
      console.error("Failed to load menu data:", err);
      error.value = err;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    fetchMenuData,
    categories,
    isLoading,
    error,
  };
}

const loadedCategories = ref({});

export async function fetchCategories(menuType) {
  const key = menuType.toLowerCase();
  const url = `${import.meta.env.VITE_API_URL}/api/menu/${key}/categories`;

  if (loadedCategories.value[key]) {
    return loadedCategories.value[key];
  }

  try {
    const res = await fetch(url);
    const data = await res.json();
    const { categories } = data;

    loadedCategories.value[key] = categories || [];
    return loadedCategories.value[key];
  } catch (err) {
    console.error("Error loading categories for", menuType, err);
    return [];
  }
}
