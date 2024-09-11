export const useTaskStore = defineStore(
  "task",
  () => {
    const tasks = ref<Task[]>([]);

    return {
      tasks,
    };
  },
  {
    persist: true,
  },
);
