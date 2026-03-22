import styles from "./TaskModal.module.css";
import type { SyntheticEvent } from "react";
import type { Task } from "../types";

interface Props {
  saveTask: (task: Task) => Promise<void>;
  order: number;
  title: string;
  description: string;
  id: string;
  setShowBtns: (value: boolean) => void;
}

function TaskModal({
  saveTask,
  order,
  title,
  description,
  id,
  setShowBtns,
}: Props) {
  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const newTask = {
      id: id !== "" ? id : crypto.randomUUID(),
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      order: order,
    };

    saveTask(newTask);

    setShowBtns(false);

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
        defaultValue={title}
      />
      <input
        className={styles.TextField}
        type="text"
        name="description"
        placeholder="Task description"
        defaultValue={description}
      />
      <button className={styles.Submit} type="submit">
        Save task
      </button>
    </form>
  );
}

export default TaskModal;
