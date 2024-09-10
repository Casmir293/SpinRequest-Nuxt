<script setup lang="ts">
import { ref, reactive } from "vue";
definePageMeta({
  layout: "auth",
});

const { isLoading, signIn } = useAuth();
const isValid = ref(false);

const payload = reactive<SigninDataForm>({
  email: "",
  password: "",
});

const rules = reactive({
  email: (v: string) => !!(v || "").match(/@/) || "Please enter a valid email",
  password: (v: string) => !!v || "Password is required",
});

const handleSubmit = async () => {
  if (!isValid.value) return;
  signIn(payload.email, payload.password);
};
</script>

<template>
  <v-card class="m-auto" style="max-width: 500px">
    <v-toolbar color="grey-darken-3" cards dark flat>
      <v-card-title class="text-h6 font-weight-regular"> Sign in </v-card-title>
    </v-toolbar>
    <v-form ref="" v-model="isValid" class="pa-4 pt-6">
      <v-text-field
        v-model="payload.email"
        :rules="[rules.email]"
        color="grey-darken-1"
        label="Email address"
        type="email"
        variant="filled"
      ></v-text-field>
      <br />
      <v-text-field
        v-model="payload.password"
        :rules="[rules.password]"
        color="grey-darken-1"
        label="Password"
        style="min-height: 96px"
        type="password"
        variant="filled"
      ></v-text-field>

      <p>
        Don't have an account?
        <nuxt-link to="/auth/signup" class="text-blue-500">sign up</nuxt-link>
      </p>
    </v-form>
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        @click="handleSubmit"
        :disabled="!isValid"
        :loading="isLoading"
        color="grey-darken-3"
      >
        Submit
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
