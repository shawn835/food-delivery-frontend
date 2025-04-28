import { useUserStore } from "@/store/userStore";
export const userMenu = [
  { label: "Profile", route: "/account" },
  { label: "My Orders", route: "/order-history" },
  { label: "Favourites", route: "/favourites" },
  { label: "Logout", action: "logout" },
];

const logoutUser = async (router) => {
  const userStore = useUserStore();
  try {
    await fetch(`${import.meta.env.VITE_API_URL}/logout`, {
      method: "POST",
      credentials: "include",
    });
    userStore.clearUser();
    router.push("/login");
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

// 🧹 cleaner handleUserClick
export const handleUserClick = async (item, router, toggleMenu) => {
  if (toggleMenu) toggleMenu();

  if (item.action === "logout") {
    await logoutUser(router);
  } else if (item.route) {
    router.push(item.route);
  }
};
