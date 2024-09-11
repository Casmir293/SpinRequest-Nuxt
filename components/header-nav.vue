<script setup lang="ts"></script>

<template>
  <section class="flex items-center justify-between">
    <h1 class="text-2xl font-semibold">Tasks</h1>
    <div>
      <task-modal :isAddTask="true" />
    </div>
  </section>
</template>
