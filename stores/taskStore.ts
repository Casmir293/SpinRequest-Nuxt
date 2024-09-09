import { ref } from "vue";
import { defineStore } from "pinia";

export const useTaskStore = defineStore(
  "task",
  () => {
    const tasks = ref<Task[]>([]);
    const selectedTask = ref<Task | null>(null);

    const updateTasks = (newTasks: Task[]) => {
      tasks.value = newTasks;
    };

    return {
      tasks,
      selectedTask,
      updateTasks,
    };
  },
  {
    persist: true,
  },
);
