import { useState } from "react";
import styles from "./Task.module.css";
import type { Task } from "../types";
import Drag from "../assets/drag.png";
import Trash from "../assets/bin.png";

interface Props {
  task: Task;
  deleteTask: (task: Task) => void;
  openModal: (title: string, description: string, task: string) => void;
  setToggledBtn: (value: number) => void;
}

function Task({ task, deleteTask, openModal, setToggledBtn }: Props) {
  const [isDraggable, setIsDraggable] = useState(false);

  return (
    <div className={styles.Wrapper} draggable={isDraggable}>
      <div className={styles.Left}>
        <button className={styles.Delete} onClick={() => deleteTask(task)}>
          <img src={Trash} alt="delete icon" draggable="false" />
        </button>
      </div>

      <div
        className={styles.Middle}
        onClick={() => {
          setToggledBtn(task.order);
          openModal(task.title, task.description, task.id);
        }}
      >
        <h2 className={styles.Heading}>{task.title}</h2>
        <p className={styles.Description}>{task.description}</p>
      </div>

      <div className={styles.Right}>
        <div
          className={styles.DragHandle}
          onMouseEnter={() => setIsDraggable(true)}
          onMouseLeave={() => setIsDraggable(false)}
          style={{ cursor: isDraggable ? "grabbing" : "grab", display: "flex" }}
        >
          <img src={Drag} alt="drag icon" draggable="false" />
        </div>
      </div>
    </div>
  );
}

export default Task;
