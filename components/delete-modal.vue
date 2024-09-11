<script setup lang="ts">
const props = defineProps({
  task: {
    type: Object as () => TaskDataForm,
    default: () => ({}),
  },
});

const { deleteTask, isLoading } = useTask();
const isDeleteDialog = ref(false);

const handleSubmit = async () => {
  if (props.task.id) {
    await deleteTask(props.task.id);
    isDeleteDialog.value = false;
  }
};
</script>

<template>
  <div>
    <v-dialog v-model="isDeleteDialog" max-width="400" persistent>
      <template v-slot:activator="{ props: activatorProps }">
        <v-icon
          v-bind="activatorProps"
          icon="mdi-delete-outline"
          class="cursor-pointer"
        />
      </template>

      <v-card
        prepend-icon="mdi-delete-outline"
        text="Deleting this task makes it go away from your shedule forever."
        title="Do you want to delete this task?"
      >
        <template v-slot:actions>
          <v-spacer></v-spacer>

          <v-btn
            variant="outlined"
            color="grey"
            @click="isDeleteDialog = false"
          >
            No, Cancel
          </v-btn>

          <v-btn
            :loading="isLoading"
            variant="tonal"
            color="red-darken-1"
            @click="handleSubmit"
          >
            Yes, Delete
          </v-btn>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>
