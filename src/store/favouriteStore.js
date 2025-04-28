import { defineStore } from "pinia";
import { ref } from "vue";

export const useFavouriteStore = defineStore(
  "favourites",
  () => {
    const favouriteMealIds = ref([]);

    const fetchFavourites = async () => {
      try {
        const res = await fetch("/api/favourites/list", {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok) {
          favouriteMealIds.value = data.favouriteMealIds;
        }
      } catch (error) {
        console.error("Error fetching favourites", error);
      }
    };

    const toggleFavourite = async (mealId) => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/togglefovourite`,
          {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ mealId }),
          }
        );

        if (res.ok) {
          if (favouriteMealIds.value.includes(mealId)) {
            favouriteMealIds.value = favouriteMealIds.value.filter(
              (id) => id === mealId
            );
          } else {
            favouriteMealIds.value.push(mealId);
          }
        }
      } catch (error) {
        console.error("error toggling favourite", error);
      }
    };

    const isFavourite = (mealId) => {
      return favouriteMealIds.value.includes(mealId);
    };
    return {
      favouriteMealIds,
      fetchFavourites,
      toggleFavourite,
      isFavourite,
    };
  },
  { persist: true }
);
