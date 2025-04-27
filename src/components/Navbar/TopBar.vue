<!-- src/components/TopBar.vue -->
<template>
  <header class="top-bar">
    <div class="container top-bar-content">
      <h5>
        <i class="fa-solid fa-location-dot"></i>
        No: 58 A, Ngara Street, Kongongoni, NB, Kenya 100100
      </h5>
      <div class="phone">
        <strong>Call <i class="fa-solid fa-phone"></i> +2543336666</strong>
      </div>
    </div>
  </header>
</template>

<style scoped>
.top-bar {
  background-color: #333;
  color: white;
  font-size: 1rem;
  padding: 6px 0;
}

.top-bar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
