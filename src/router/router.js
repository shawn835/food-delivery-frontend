import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/store/userStore";
import { fetchUser } from "@/composables/authUser";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/allViews/homeView.vue"),
    },
    {
      path: "/menu/:menuType/:category", // Dynamic route for each menu (e.g., breakfast, mains)
      name: "menuItems",
      component: () => import("@/views/allViews/menuItemView.vue"),
    },
    {
      path: "/cart",
      name: "cart",
      component: () => import("@/views/allViews/cartView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/checkout",
      name: "checkout",
      component: () => import("@/views/allViews/checkoutView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/allViews/LoginView.vue"),
      meta: { hideLayout: true },
    },
    {
      path: "/register",
      name: "register",
      component: () => import("@/views/allViews/RegisterView.vue"),
      meta: { hideLayout: true },
    },
    {
      path: "/orders/track-:id",
      name: "trackOrder",
      component: () => import("@/views/allViews/trackOrderView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/account",
      name: "account",
      component: () => import("@/views/allViews/accountView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/order-history",
      name: "orderhistory",
      component: () => import("@/views/allViews/orderView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/favourites",
      name: "favourites",
      component: () => import("@/views/allViews/favouriteView.vue"),
      meta: { requiresAuth: true },
    },

    {
      path: "/admin",
      component: () => import("@/views/allViews/adminView.vue"), // this is your layout
      meta: { requiresAuth: true, hideLayout: true, requiresAdmin: true },

      children: [
        {
          path: "dashboard",
          component: () => import("@/views/AdminViews/dashboardView.vue"),
        },
        {
          path: "meals",
          component: () => import("@/views/AdminViews/mealsView.vue"),
        },
        {
          path: "orders",
          component: () => import("@/views/AdminViews/ordersView.vue"),
        },
        {
          path: "users",
          component: () => import("@/views/AdminViews/usersView.vue"),
        },
        {
          path: "reports",
          component: () => import("@/views/AdminViews/reportsView.vue"),
        },
        {
          path: "categories",
          component: () => import("@/views/AdminViews/categoriesView.vue"),
        },
        {
          path: "settings",
          component: () => import("@/views/AdminViews/settingsView.vue"),
        },
        // Add more admin pages here...
      ],
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();

  if (to.meta.requiresAuth) {
    const currentUser = await fetchUser();
    if (!currentUser) {
      userStore.clearUser();
      return next("/login");
    }

    userStore.setUser(currentUser);

    //admin check
    if (to.meta.requiresAdmin && currentUser.role !== "admin") {
      return next("/login"); //  403 page
    }

    return next();
  }

  next();
});

export default router;
