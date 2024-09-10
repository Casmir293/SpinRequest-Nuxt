<script setup lang="ts"></script>

<template>
  <section class="flex h-dvh flex-col items-center justify-center">
    <h1 class="font-sans text-3xl font-bold">⌛ Task Manager ⌛</h1>
    <p class="mb-10 font-thin">The ultimate schedule manager</p>
    <main class="w-[90%]">
      <slot />
    </main>
  </section>
</template>
