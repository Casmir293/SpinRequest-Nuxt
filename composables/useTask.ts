import { useNuxtApp } from "nuxt/app";
import { toast } from "vue3-toastify";
import { storeToRefs } from "pinia";
import { useTaskStore } from "../stores/taskStore";
import useAuth from "./useAuth";
import { ref } from "vue";
import { logger } from "../utils/helpers";
import { FirebaseError } from "firebase/app";
import {
  doc,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  collection,
  type Firestore,
} from "firebase/firestore/lite";

export default function useTask() {
  const $db = useNuxtApp().$db as Firestore;
  const { tasks } = storeToRefs(useTaskStore());
  const TASK_STORE = useTaskStore();
  const { userId } = useAuth();
  const isLoading = ref(false);
  const error = ref<FirebaseError | string | null>(null);

  const fetchTasks = async () => {
    isLoading.value = true;
    try {
      const querySnapshot = await getDocs(
        collection($db, `users/${userId.value}/tasks`),
      );
      const response = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      TASK_STORE.tasks = response as Task[];

      return response;
    } catch (err: any) {
      error.value = err;
      logger("Error fetching tasks ==>", error);
      if (err instanceof FirebaseError) {
        toast.error(`Fetch tasks failed: ${err.code}`);
      } else {
        toast.error(`Fetch tasks failed: ${err}`);
      }
    } finally {
      isLoading.value = false;
    }
  };

  const addTask = async (payload: TaskDataForm) => {
    isLoading.value = true;
    try {
      await addDoc(collection($db, `users/${userId.value}/tasks`), payload);
      toast.success("Task added successfully!");
      await fetchTasks();
    } catch (err: any) {
      error.value = err;
      logger("Error adding task ==>", error);
      if (err instanceof FirebaseError) {
        toast.error(`Add task failed: ${err.code}`);
      } else {
        toast.error(`Add task failed: ${err}`);
      }
    } finally {
      isLoading.value = false;
    }
  };

  const updateTask = async (
    taskId: string,
    updatedData: Partial<TaskDataForm>,
  ) => {
    isLoading.value = true;
    try {
      const taskRef = doc($db, `users/${userId.value}/tasks`, taskId);
      await updateDoc(taskRef, updatedData);
      toast.success("Task updated successfully!");
      await fetchTasks();
    } catch (err: any) {
      error.value = err;
      logger("Error updating task ==>", error);
      if (err instanceof FirebaseError) {
        toast.error(`Update task failed: ${err.code}`);
      } else {
        toast.error(`Update task failed: ${err}`);
      }
    } finally {
      isLoading.value = false;
    }
  };

  const deleteTask = async (taskId: string) => {
    isLoading.value = true;
    try {
      await deleteDoc(doc($db, `users/${userId.value}/tasks`, taskId));
      toast.success("Task deleted successfully!");
      await fetchTasks();
    } catch (err: any) {
      error.value = err;
      logger("Error deleting task ==>", error);
      if (err instanceof FirebaseError) {
        toast.error(`Delete task failed: ${err.code}`);
      } else {
        toast.error(`Delete task failed: ${err}`);
      }
    } finally {
      isLoading.value = false;
    }
  };

  return {
    TASKS: tasks,
    isLoading,
    fetchTasks,
    addTask,
    updateTask,
    deleteTask,
  };
}
