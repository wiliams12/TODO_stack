import styles from "./Task.module.css";
import type { Task } from "../types";

interface Props {
  task: Task;
}

function Task({ task }: Props) {
  return (
    <div className={styles.Wrapper}>
      <h2 className={styles.Heading}>{task.title}</h2>
      <p className={styles.Description}>{task.description}</p>
    </div>
  );
}

export default Task;
