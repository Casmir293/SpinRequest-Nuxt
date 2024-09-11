<script setup lang="ts">
const { TASKS } = useTask();

const status = [
  { name: "Pending", background: "#CAD9F6", icon: "mdi-text-box-edit-outline" },
  { name: "In progress", background: "#FFE4C2", icon: "mdi-timer-sand" },
  { name: "Completed", background: "#FAD0C6", icon: "mdi-check" },
];

const tasksByStatus = computed(() =>
  status.map((column) => ({
    name: column.name,
    tasks: TASKS.value?.filter((task) => task.status === column.name),
  })),
);
</script>

<template>
  <section class="grid gap-8 p-4">
    <template v-for="(column, index) in tasksByStatus" :key="index">
      <div
        :style="{ backgroundColor: status[index].background }"
        class="min-h-60 rounded-md p-4"
      >
        <div class="mb-3 flex items-center justify-between">
          <div>
            <v-icon :icon="status[index].icon" />
            <span class="font-semibold">{{ column.name }}</span>
          </div>
          <div v-if="column.tasks">Total: {{ column.tasks.length }}</div>
        </div>
        <div>
          <template v-if="column.tasks && column.tasks.length > 0">
            <template v-for="task in column.tasks" :key="task.id">
              <task-card :task="task" />
            </template>
          </template>
          <template v-else>
            <p v-if="column.name === 'Pending'">
              You have no <b>pending</b> task
            </p>
            <p v-if="column.name === 'In progress'">
              You have no task <b>in progress</b>
            </p>
            <p v-if="column.name === 'Completed'">
              You have no <b>completed</b> task
            </p>
          </template>
        </div>
      </div>
    </template>
  </section>
</template>

<style scoped>
section {
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}
</style>
