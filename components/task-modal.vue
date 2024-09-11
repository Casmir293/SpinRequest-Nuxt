<script setup lang="ts">
const { isLoading, addTask, updateTask } = useTask();
const isValid = ref(false);

const props = defineProps({
  isAddTask: {
    type: Boolean,
    default: false,
  },
  isEditTask: {
    type: Boolean,
    default: false,
  },
  task: {
    type: Object as () => TaskDataForm,
    default: () => ({}),
  },
});

const dialog = ref(false);

const form = reactive<TaskDataForm>({
  title: "",
  description: "",
  priority: "",
  status: "",
  due_date: null,
});

watch(dialog, (newVal) => {
  if (newVal && props.isEditTask && props.task) {
    Object.assign(form, {
      title: props.task?.title,
      description: props.task?.description,
      priority: props.task?.priority,
      status: props.task?.status,
      due_date: props.task?.due_date,
    });
  }
});

const rules = reactive({
  title: (v: string) => !!v || "Title is required",
  description: (v: string) => !!v || "Description is required",
  priority: (v: string) => !!v || "Priority is required",
  status: (v: string) => !!v || "Status is required",
});

const handleSubmit = async () => {
  if (!isValid.value) return;

  if (props.isEditTask && props.task.id) {
    await updateTask(props.task.id, form);
  } else if (props.isAddTask) {
    await addTask(form);
  }

  dialog.value = false;
};
</script>

<template>
  <section>
    <v-dialog v-model="dialog" max-width="600">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          v-if="isAddTask"
          class="text-none font-weight-regular"
          prepend-icon="mdi-plus"
          text="New Task"
          variant="tonal"
          v-bind="activatorProps"
        />
        <v-icon
          v-if="isEditTask"
          icon="mdi-pencil-outline"
          class="cursor-pointer"
          v-bind="activatorProps"
        />
      </template>

      <v-card prepend-icon="mdi-note-edit-outline" title="Schedule Task">
        <v-form ref="" v-model="isValid" fast-fail @submit.prevent>
          <v-card-text>
            <v-row dense>
              <v-col cols="12">
                <v-text-field
                  label="Title*"
                  v-model="form.title"
                  :rules="[rules.title]"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  label="Description*"
                  v-model="form.description"
                  :rules="[rules.description]"
                  clearable
                  required
                ></v-textarea>
              </v-col>
              <v-col cols="12" md="4" sm="6">
                <v-select
                  :items="['low', 'medium', 'high']"
                  label="Priority*"
                  v-model="form.priority"
                  :rules="[rules.priority]"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" md="4" sm="6">
                <v-select
                  :items="['Pending', 'In progress', 'Completed']"
                  label="Status*"
                  v-model="form.status"
                  :rules="[rules.status]"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" md="4" sm="6">
                <p class="text-gray-500">Due date</p>
                <input
                  type="date"
                  v-model="form.due_date"
                  required
                  class="w-full rounded-md border p-1.5"
                />
              </v-col>
            </v-row>

            <small class="text-caption text-medium-emphasis"
              >*indicates required field</small
            >
          </v-card-text>
        </v-form>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text="Close" variant="plain" @click="dialog = false"></v-btn>
          <v-btn
            color="primary"
            text="Save"
            variant="tonal"
            :disabled="!isValid"
            :loading="isLoading"
            @click="handleSubmit"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </section>
</template>
