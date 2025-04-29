<!-- components/AuthForm.vue -->
<template>
  <div class="auth-container">
    <form class="auth-form" @submit.prevent="onSubmit">
      <h2>{{ title }}</h2>
      <slot name="inputs" />
      <button type="submit" class="primary-btn" :disabled="loading">
        <span v-if="loading">
          <svg class="spinner" viewBox="0 0 50 50">
            <circle
              class="path"
              cx="25"
              cy="25"
              r="20"
              fill="none"
              stroke-width="5" />
          </svg>
          {{ loadingText }}
        </span>
        <span v-else>{{ buttonText }}</span>
      </button>
      <slot name="footer" />
    </form>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  buttonText: String,
  loadingText: {
    type: String,
    default: "Processing...",
  },
  loading: Boolean,
  onSubmit: Function,
});
</script>

<style scoped>
.auth-container {
  min-height: 100vh;
  background: url("https://media.istockphoto.com/id/1341976416/photo/healthy-eating-and-diet-concepts-top-view-of-spring-salad-shot-from-above-on-rustic-wood-table.jpg?s=612x612&w=0&k=20&c=W5KTFYX-XpIioWdMwcb2ESGZGyolLSCd9vbNUxpZiQE=")
    no-repeat center center/cover;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.auth-form {
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  background-color: rgba(255, 255, 255, 0.15);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
  padding: 2rem;
  width: 100%;
  max-width: 450px;
  color: #fff;
  text-align: center;
}

.auth-form h2 {
  margin-bottom: 1rem;
  font-size: 2rem;
}

.auth-form input {
  width: 100%;
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
  border: none;
  border-radius: 10px;
  outline: none;
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  font-size: 1rem;
}

.auth-form input::placeholder {
  color: #eaeaea;
}

.primary-btn {
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 10px;
  background: #00b4d8;
  color: white;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;
}

.primary-btn:hover {
  background: #0096c7;
}

.spinner {
  height: 24px;
  width: 24px;
  animation: rotate 2s linear infinite;
}

.path {
  stroke: #fff;
  stroke-linecap: round;
  animation: dash 1.5s ease-in-out infinite;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
}
</style>
