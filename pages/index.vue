<script setup lang="ts">
import { toast } from "vue3-toastify";
const { myProfile } = useAuth();

definePageMeta({
  middleware: "auth",
});

function showToast() {
  toast.success("This is a toast notification!");
}
</script>

<template>
  <h1 class="text-3xl font-bold underline">Hello world!</h1>

  <p class="my-5 text-2xl">
    Welcome, <b>{{ myProfile?.name }}</b>
  </p>
  <v-btn
    @click="showToast"
    append-icon="mdi-account-circle"
    prepend-icon="mdi-check-circle"
  >
    <template v-slot:prepend>
      <v-icon color="success"></v-icon>
    </template>
    Click Me!
    <template v-slot:append>
      <v-icon color="warning"></v-icon>
    </template>
  </v-btn>
</template>
