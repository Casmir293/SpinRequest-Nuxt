<template>
  <h1 class="text-3xl font-bold underline">Hello world!</h1>
  <button
    @click="showToast"
    class="bg-sky-700 px-4 py-2 text-white hover:bg-sky-800 sm:px-8 sm:py-3"
  >
    ...testing
  </button>
  <v-btn> Button </v-btn>

  <v-btn append-icon="mdi-account-circle" prepend-icon="mdi-check-circle">
    <template v-slot:prepend>
      <v-icon color="success"></v-icon>
    </template>

    Button

    <template v-slot:append>
      <v-icon color="warning"></v-icon>
    </template>
  </v-btn>

  <NuxtLayout>
    <NuxtLoadingIndicator />
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { toast } from "vue3-toastify";

function showToast() {
  toast.success("This is a toast notification!");
}
</script>
