<script lang="ts" setup>
definePageMeta({
  layout: "empty",
});

const { logOut } = useAuth();

onMounted(async () => {
  await logOut();
  setTimeout(() => {
    navigateTo("/auth/login");
  }, 2000);
});
</script>

<template>
  <section></section>
</template>
