<template>
  <div class="hamburger" @click="openMenu">
    <span class="top"></span>
    <span class="middle"></span>
    <span class="bottom"></span>
  </div>
</template>

<script setup>
const props = defineProps({
  style: Object,
});
const emit = defineEmits(["toggle-menu"]);

const openMenu = () => {
  emit("toggle-menu");
};
</script>

<style scoped>
.hamburger {
  width: 25px;
  height: 30px;
  position: fixed;
  top: 15px;
  left: 10px;
  cursor: pointer;
  display: none;
}

.top,
.middle,
.bottom {
  position: absolute;
  width: 100%;
  height: 2px;
  top: 0;
  left: 0;
  background: var(--text-base);
}

.middle {
  transform: translateY(5px);
  width: 50%;
}
.bottom {
  transform: translateY(10px);
}

@media (max-width: 768px) {
  .hamburger {
    display: block;
  }
}
</style>
