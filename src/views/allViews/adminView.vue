<template>
  <div class="admin-panel">
    <adminMenu />
    <!-- Main Content -->
    <div class="main-content">
      <header class="topbar">
        <h1>{{ pageTitle }}</h1>
      </header>
      <div class="content-area">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script setup>
import adminMenu from "@/components/admin/adminMenu.vue";
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const pageTitle = computed(() => route.path.split("/").pop());
</script>

<style scoped>
.admin-panel {
  display: flex;
  min-height: 100vh;
  font-family: sans-serif;
}

.main-content {
  flex: 1;
  background: #f9f9f9;
  padding: 1rem;
}

.topbar {
  background: white;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.content-area {
  background: white;
  padding: 1rem;
  border-radius: 8px;
  min-height: 500px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}
</style>
