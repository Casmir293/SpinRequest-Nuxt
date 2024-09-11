<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});

const { myProfile } = useAuth();
const { fetchTasks } = useTask();

onMounted(() => fetchTasks());
</script>

<template>
  <main class="max-w-[95%] lg:max-w-[97%]">
    <div class="mb-8 mr-2 bg-slate-200 p-4 text-center md:mr-0">
      <h2 class="font-sans text-4xl font-bold">
        Hello, {{ myProfile?.name }}!
      </h2>
      <p class="text-xl font-thin">
        If you fail to plan, you're planing to fail.
        <span class="font-normal">Make that plan TODAY 🫵</span>
      </p>
    </div>

    <div class="mr-2 md:mr-0">
      <header-nav />
      <status-column />
    </div>
  </main>
</template>
