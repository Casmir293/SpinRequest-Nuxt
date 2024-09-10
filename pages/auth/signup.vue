<script setup lang="ts">
definePageMeta({
  layout: "auth",
  middleware: "guest",
});

const { isLoading, signUp } = useAuth();
const isValid = ref(false);

const payload = reactive<SignupDataForm>({
  name: "",
  email: "",
  password: "",
});

const rules = reactive({
  email: (v: string) => !!(v || "").match(/@/) || "Please enter a valid email",
  length: (len: number) => (v: string) =>
    (v || "").length >= len || `Invalid character length, required ${len}`,
  password: (v: string) =>
    !!(v || "").match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) ||
    "Password must contain an upper case letter, a numeric character, and a special character",
  name: (v: string) => !!v || "Nickname is required",
});

const handleSubmit = async () => {
  if (!isValid.value) return;
  signUp(payload.name, payload.email, payload.password);
};
</script>

<template>
  <v-card class="m-auto" style="max-width: 500px">
    <v-toolbar color="grey-darken-3" cards dark flat>
      <v-card-title class="text-h6 font-weight-regular"> Sign up </v-card-title>
    </v-toolbar>
    <v-form ref="" v-model="isValid" class="pa-4 pt-6">
      <v-text-field
        v-model="payload.name"
        :rules="[rules.name]"
        color="grey-darken-1"
        label="Nick name"
        type="email"
        variant="filled"
      ></v-text-field>
      <br />
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
        :rules="[rules.password, rules.length(6)]"
        color="grey-darken-1"
        counter="6"
        label="Password"
        style="min-height: 96px"
        type="password"
        variant="filled"
      ></v-text-field>

      <p>
        Already have an account?
        <nuxt-link to="/auth/login" class="text-blue-500">sign in</nuxt-link>
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
