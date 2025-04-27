import { useUserStore } from "@/store/userStore";

export const fetchUser = async () => {
  const userStore = useUserStore();
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/me`, {
      credentials: "include",
    });
    if (!res.ok) throw new Error("Not logged in");
    const { user } = await res.json();
    userStore.setUser(user);
    return user;
  } catch (err) {
    console.error("Error fetching user:", err.message);
    userStore.clearUser();
    return null;
  }
};
