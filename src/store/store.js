import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useCartStore = defineStore(
  "cart",
  () => {
    const cartItems = ref([]);

    const addToCart = (meal) => {
      const existing = cartItems.value.find((item) => item.id === meal.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        cartItems.value.push({ ...meal, quantity: 1 });
      }
    };

    const removeFromCart = (id) => {
      const index = cartItems.value.findIndex((item) => item.id === id);
      if (index !== -1) {
        const item = cartItems.value[index];
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          cartItems.value.splice(index, 1);
        }
      }
    };

    const getQuantity = (id) => {
      const item = cartItems.value.find((item) => item.id === id);
      return item?.quantity || 0;
    };

    const totalItems = () => {
      return cartItems.value.reduce((acc, item) => acc + item.quantity, 0);
    };

    const totalPrice = computed(() =>
      cartItems.value.reduce(
        (sum, item) => sum + Number(item.price) * Number(item.quantity),
        0
      )
    );

    const removeItemCompletely = (id) => {
      const index = cartItems.value.findIndex((item) => item.id === id);
      if (index !== -1) {
        cartItems.value.splice(index, 1);
      }
    };

    return {
      cartItems,
      addToCart,
      removeFromCart,
      getQuantity,
      totalItems,
      totalPrice,
      removeItemCompletely,
    };
  },
  {
    persist: true, // <- 👈 add this
  }
);
