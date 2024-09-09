import { defineNuxtPlugin } from "nuxt/app";
import Vue3Toastify, { type ToastContainerOptions } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const options: ToastContainerOptions = {
  autoClose: 3000,
};

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Vue3Toastify, options);
});
