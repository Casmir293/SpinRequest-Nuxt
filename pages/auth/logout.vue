<script lang="ts" setup>
definePageMeta({
  layout: "empty",
});

const { logOut } = useAuth();

onMounted(() => {
  logOut();
  setTimeout(() => {
    navigateTo("/auth/login");
  }, 1500);
});
</script>

<template>
  <section></section>
</template>
