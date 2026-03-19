import styles from "./List.module.css";
import type { Task } from "../types";
import TaskComponent from "./Task";
import NewTask from "./NewTask";

interface Props {
  tasks: Task[];
}

function List({ tasks }: Props) {
  return (
    <ul className={styles.Wrapper}>
      {tasks.length === 0 ? (
        <li className={`${styles.noTasks} ${styles.Item}`}>
          <h2>No tasks</h2>
          <NewTask />
        </li>
      ) : (
        tasks.map((item) => (
          <li className={styles.Item}>
            <TaskComponent />
          </li>
        ))
      )}
    </ul>
  );
}

export default List;
