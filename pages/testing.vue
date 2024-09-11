<script setup lang="ts">
import { toast } from "vue3-toastify";

definePageMeta({
  layout: "auth",
});

const { myProfile } = useAuth();

const showToast = () => {
  toast.success("You are a member!");
};
</script>

<template>
  <section
    class="mx-auto rounded-md bg-slate-200 p-3 shadow-lg lg:max-w-[50%] lg:p-8"
  >
    <h1 class="text-xl font-semibold">
      Hello, {{ myProfile?.name ?? "there" }} 👋
    </h1>
    <br />
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse doloremque
      impedit repellendus saepe sint sed laborum, quis quo magni nulla,
      laudantium soluta ab fuga voluptatum doloribus quas ad nesciunt facilis.
    </p>
    <p class="mt-3" v-if="myProfile">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse doloremque
      impedit repellendus saepe sint sed laborum, quis quo magni nulla,
      laudantium soluta ab fuga voluptatum doloribus quas ad nesciunt facilis.
    </p>
    <section>
      <template v-if="myProfile">
        <v-btn block @click="showToast" class="mt-5">Test me</v-btn>
        <nuxt-link to="/" class="mt-2 block text-blue-500 underline"
          >Go home</nuxt-link
        >
      </template>
      <template v-else>
        <nuxt-link to="/auth/signup">
          <v-btn block class="mt-5">Join Now!</v-btn>
        </nuxt-link>
      </template>
    </section>
  </section>
</template>
