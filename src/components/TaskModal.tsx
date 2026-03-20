import styles from "./TaskModal.module.css";
import type { SyntheticEvent } from "react";
import type { Task } from "../types";

interface Props {
  saveTask: (task: Task) => Promise<void>;
  order: number;
}

function TaskModal({ saveTask, order }: Props) {
  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const newTask = {
      id: crypto.randomUUID(),
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      order: order,
    };

    saveTask(newTask);

    e.currentTarget.reset();
  };

  return (
    <form className={styles.Wrapper} onSubmit={handleSubmit}>
      <input
        className={styles.TextField}
        type="text"
        name="title"
        placeholder="Task name"
        required
      />
      <input
        className={styles.TextField}
        type="text"
        name="description"
        placeholder="Task description"
      />
      <button className={styles.Submit} type="submit">
        Create task
      </button>
    </form>
  );
}

export default TaskModal;
