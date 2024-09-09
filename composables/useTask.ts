import { useNuxtApp } from "nuxt/app";
import { useToast } from "vue-toastification";
import { storeToRefs } from "pinia";
import { useTaskStore } from "../stores/taskStore";
import useAuth from "./useAuth";
import { ref } from "vue";
import { logger } from "../utils/helpers";
import { FirebaseError } from "firebase/app";
import {
  doc,
  setDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  collection,
  Firestore,
} from "firebase/firestore/lite";

export default function useTask() {
  const $db = useNuxtApp().$db as Firestore;
  const { tasks } = storeToRefs(useTaskStore());
  const TASK_STORE = useTaskStore();
  const { userId } = useAuth();
  const toast = useToast();
  const isLoading = ref(false);
  const error = ref<FirebaseError | string | null>(null);

  const fetchTasks = async () => {
    isLoading.value = true;
    try {
      const querySnapshot = await getDocs(
        collection($db, `users/${userId}/tasks`),
      );
      const taskList: Task[] = [];
      querySnapshot.forEach((doc) => {
        taskList.push({ id: doc.id, ...doc.data() } as Task);
      });
      TASK_STORE.updateTasks(taskList);
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

  const addTask = async (task: Task) => {
    isLoading.value = true;
    try {
      const docRef = await setDoc(
        doc(collection($db, `users/${userId}/tasks`)),
        task,
      );
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

  const updateTask = async (task: Task) => {
    isLoading.value = true;
    try {
      await updateDoc(doc($db, `users/${userId}/tasks`, task.id), {
        ...task,
      });
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
      await deleteDoc(doc($db, `users/${userId}/tasks`, taskId));
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
    tasks,
    isLoading,
    fetchTasks,
    addTask,
    updateTask,
    deleteTask,
  };
}
