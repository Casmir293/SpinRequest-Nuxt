<script setup lang="ts">
import type { NuxtError } from "#app";

defineProps({
  error: Object as () => NuxtError,
});
</script>

<template>
  <section class="flex h-dvh flex-col items-center justify-center">
    <h1 class="font-sans text-3xl font-bold">⌛ Plan & Do ⌛</h1>
    <p class="mb-10 border-b-2 font-thin">The ultimate schedule manager</p>
    <main class="w-[90%]">
      <section class="flex flex-col items-center justify-center">
        <div class="mb-3 text-2xl font-semibold">
          {{ error?.statusCode }} - {{ error?.statusMessage }}
        </div>

        <nuxt-link
          @click="clearError"
          to="/"
          class="block text-xl text-blue-500 underline"
          >Go Home</nuxt-link
        >
      </section>
    </main>
  </section>
</template>
