import { openDB, type DBSchema } from "idb";
import type { Task } from "./types";

const DB_NAME = "task-database";
const STORE_NAME = "tasks";

interface TaskDB extends DBSchema {
  tasks: {
    key: string;
    value: Task;
  };
}

export async function initDB() {
  return await openDB<TaskDB>(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    },
  });
}

export async function storeTask(task: Task): Promise<void> {
  try {
    const db = await initDB();
    await db.put(STORE_NAME, task);
  } catch (error) {
    console.error("IndexedDB write failed:", error);
    throw error;
  }
}

export async function getTasks(): Promise<Task[]> {
  const db = await initDB();
  return await db.getAll(STORE_NAME);
}

export async function deleteTask(task: Task): Promise<void> {
  try {
    const db = await initDB();
    await db.delete(STORE_NAME, task.id);
  } catch (error) {
    console.error("IndexedDB deletion failed:", error);
    throw error;
  }
}
