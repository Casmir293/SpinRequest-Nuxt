<script setup>
useHead({
  title: "Task Manager",
  link: [
    {
      rel: "icon",
      type: "image/jpeg",
      href: "/images/logo.jpeg",
    },
  ],
});
</script>

<template>
  <nuxt-layout>
    <nuxt-loading-indicator />
    <nuxt-page />
  </nuxt-layout>
</template>
