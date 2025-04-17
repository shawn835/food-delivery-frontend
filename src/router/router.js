import { createRouter, createWebHistory } from "vue-router";
import { fetchUser } from "@/composables/authUser";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/homeView.vue"),
    },
    {
      path: "/menu/:menuType/:category", // Dynamic route for each menu (e.g., breakfast, mains)
      name: "menuItems",
      component: () => import("@/views//menuItemView.vue"),
    },
    {
      path: "/cart",
      name: "cart",
      component: () => import("@/views/cartView.vue"),
    },
    {
      path: "/checkout",
      name: "checkout",
      component: () => import("@/views/checkoutView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/LoginView.vue"),
      meta: { hideLayout: true },
    },
    {
      path: "/register",
      name: "register",
      component: () => import("@/views/RegisterView.vue"),
      meta: { hideLayout: true },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    try {
      const currentUser = await fetchUser();

      if (currentUser) {
        next();
      } else {
        next("/login");
      }
    } catch (err) {
      console.error("Auth check failed:", err.message);
    }
  } else {
    next();
  }
});

export default router;
