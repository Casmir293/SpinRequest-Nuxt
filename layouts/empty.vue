<script setup></script>

<template>
  <div class="empty-layout">
    <img
      src="https://i.ebayimg.com/images/g/d3gAAOSwmm5mhkl0/s-l1600.webp"
      alt="logo"
    />
    <slot />
  </div>
</template>

<style scoped>
.empty-layout {
  @apply flex h-screen w-screen animate-pulse items-center justify-center;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(0.7);
  }

  70% {
    transform: scale(1);
  }

  100% {
    transform: scale(0.7);
  }
}
</style>
