import styles from "./List.module.css";
import type { Task } from "../types";
import TaskComponent from "./Task";
import NewTask from "./NewTask";
import React from "react";

interface Props {
  tasks: Task[];
  addTask: () => void;
  setToggledBtn: (value: number) => void;
}

function List({ tasks, addTask, setToggledBtn }: Props) {
  return (
    <ul className={styles.Wrapper}>
      {tasks.length === 0 ? (
        <li className={`${styles.noTasks} ${styles.Item}`}>
          <h2>No tasks</h2>
          <NewTask
            addTask={addTask}
            setToggledBtn={setToggledBtn}
            buttonOrder={0}
          />
        </li>
      ) : (
        <>
          {tasks.map((item, index) => (
            <React.Fragment key={item.id}>
              <li className={styles.HiddenBtn}>
                <div className={styles.Hidden}>
                  <NewTask
                    addTask={addTask}
                    setToggledBtn={setToggledBtn}
                    buttonOrder={index}
                  />
                </div>
              </li>
              <li className={styles.Item}>
                <TaskComponent task={item} />
              </li>
            </React.Fragment>
          ))}
          <li className={styles.HiddenBtn}>
            <div className={styles.Hidden}>
              <NewTask
                addTask={addTask}
                setToggledBtn={setToggledBtn}
                buttonOrder={tasks.length}
              />
            </div>
          </li>
        </>
      )}
    </ul>
  );
}

export default List;
