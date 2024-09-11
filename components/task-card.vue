<script setup lang="ts">
defineProps<{
  task: TaskDataForm;
}>();
</script>

<template>
  <section class="mb-6 border-2 bg-slate-50 p-2">
    <div class="mb-3 flex items-center justify-between">
      <div class="text-xl font-semibold">{{ task.title }}</div>
      <div class="flex items-center">
        <task-modal :isEditTask="true" :task="task" />
        <delete-modal :task="task" />
      </div>
    </div>
    <p>
      {{ task.description }}
    </p>
    <div class="mt-3 flex items-center gap-2">
      <div
        class="h-3 w-3 rounded-full"
        :class="`priority-${task.priority}`"
      ></div>
      <p class="font-light">{{ task.priority }}</p>
    </div>
  </section>
</template>

<style scoped>
.priority-low {
  background: orange;
}

.priority-medium {
  background: green;
}

.priority-high {
  background: red;
}
</style>
