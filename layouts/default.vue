<script setup lang="ts">
import { ref } from "vue";
import useAuth from "../composables/useAuth";

const { myProfile } = useAuth();

const drawer = ref(true);
const rail = ref(true);
</script>

<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer
        v-model="drawer"
        :rail="rail"
        permanent
        @click="rail = false"
      >
        <v-list-item
          prepend-avatar="https://as1.ftcdn.net/v2/jpg/05/16/27/58/1000_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg"
          :title="myProfile?.name"
          nav
        >
          <template v-slot:append>
            <v-btn
              icon="mdi-chevron-left"
              variant="text"
              @click.stop="rail = !rail"
            ></v-btn>
          </template>
        </v-list-item>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <router-link :to="{ name: 'SignOut' }">
            <v-list-item
              prepend-icon="mdi-logout"
              title="Logout"
              value="logout"
            ></v-list-item>
          </router-link>
        </v-list>
      </v-navigation-drawer>
      <v-main class="m-4">
        <!-- <RouterView /> -->
      </v-main>
    </v-layout>
  </v-card>
</template>
