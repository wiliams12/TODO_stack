import React, { useState } from "react";
import styles from "./List.module.css";
import type { Task } from "../types";
import TaskComponent from "./Task";
import NewTask from "./NewTask";

interface Props {
  tasks: Task[];
  addTask: () => void;
  setToggledBtn: (value: number) => void;
  deleteTask: (task: Task) => void;
  openModal: (title: string, description: string, task: string) => void;
  setCurrentDrag: (order: number | null) => void;
  handleDragDrop: (targetIndex: number) => void;
  showButtons: boolean;
}

function List({
  tasks,
  addTask,
  setToggledBtn,
  deleteTask,
  openModal,
  handleDragDrop,
  setCurrentDrag,
  showButtons,
}: Props) {
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  return (
    <div className={styles.Wrapper}>
      <ul className={styles.Scroll}>
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
                <li
                  className={`${styles.HiddenBtn} ${dragOverIndex === index ? styles.DragOver : ""} ${showButtons ? styles.Show : ""}`}
                  onDragEnter={(e) => {
                    e.preventDefault();
                    setDragOverIndex(index);
                  }}
                  onDragLeave={() => setDragOverIndex(null)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragOverIndex(null);
                    handleDragDrop(index);
                  }}
                >
                  <div className={styles.Hidden}>
                    <NewTask
                      addTask={addTask}
                      setToggledBtn={setToggledBtn}
                      buttonOrder={index}
                    />
                  </div>
                </li>

                <li className={styles.Item}>
                  <TaskComponent
                    task={item}
                    deleteTask={deleteTask}
                    openModal={openModal}
                    setToggledBtn={setToggledBtn}
                    setCurrentDrag={setCurrentDrag}
                  />
                </li>
              </React.Fragment>
            ))}

            <li
              className={`${styles.HiddenBtn} ${dragOverIndex === tasks.length ? styles.DragOver : ""} ${showButtons ? styles.Show : ""}`}
              onDragEnter={(e) => {
                e.preventDefault();
                setDragOverIndex(tasks.length);
              }}
              onDragLeave={() => setDragOverIndex(null)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                setDragOverIndex(null);
                // 3. CRITICAL: Pass the exact drop location for the very bottom slot
                handleDragDrop(tasks.length);
              }}
            >
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
    </div>
  );
}

export default List;
