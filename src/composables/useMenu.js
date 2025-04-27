// src/composables/useMenu.js
import { ref, onMounted, onUnmounted } from "vue";
import { useMenuStore } from "@/store/menuStore";

export function useMenu() {
  const menuStore = useMenuStore();
  const isMobile = ref(false);
  const hoveredMenuType = ref(null);
  const activeMobileMenutype = ref(null);
  const activeCategories = ref([]);

  const checkMobile = () => {
    isMobile.value = window.innerWidth <= 768;
  };

  onMounted(() => {
    checkMobile();
    window.addEventListener("resize", checkMobile);
    if (menuStore.menuTypes.length === 0) {
      menuStore.fetchMenuTypes();
    }
  });

  onUnmounted(() => {
    window.removeEventListener("resize", checkMobile);
  });

  const handleHover = async (menuType) => {
    if (window.innerWidth > 768) {
      hoveredMenuType.value = menuType;
      activeCategories.value = await menuStore.fetchCategories(menuType);
    }
  };

  const resetHover = () => {
    hoveredMenuType.value = null;
  };

  const openMobileMenu = async (menuType) => {
    if (window.innerWidth <= 768) {
      activeMobileMenutype.value = menuType;
      activeCategories.value = await menuStore.fetchCategories(menuType);
    }
  };

  const backToMainMenu = () => {
    activeMobileMenutype.value = null;
  };

  return {
    isMobile,
    hoveredMenuType,
    activeMobileMenutype,
    activeCategories,
    handleHover,
    resetHover,
    openMobileMenu,
    backToMainMenu,
  };
}
