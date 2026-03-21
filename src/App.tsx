import { use, useState, useEffect, useMemo } from "react";
import { deleteTask, getTasks, initDB, storeTask } from "./database";
import { Task } from "./types";
import styles from "./App.module.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import List from "./components/List";
import TaskModal from "./components/TaskModal";
import Cross from "./assets/close.png";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [toggledBtn, setToggledBtn] = useState(0);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [id, setId] = useState("");

  const [currentDrag, setCurrentDrag] = useState<number | null>(null);

  useEffect(() => {
    async function setup() {
      await initDB();
      const savedTasks = await getTasks();
      setTasks(savedTasks);
    }
    setup();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    if (isModalOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  const sortedTasks = useMemo(() => {
    const tasksCopy = [...tasks];
    return tasksCopy.sort((first, second) => first.order - second.order);
  }, [tasks]);

  const openModal = (
    title: string = "",
    description: string = "",
    id: string = "",
  ) => {
    setTitle(title);
    setDescription(description);
    setId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveTask = async (newTask: Task) => {
    try {
      const isEditing = tasks.some((t) => t.id === newTask.id);

      if (isEditing) {
        await storeTask(newTask);

        setTasks((prevTasks) =>
          prevTasks.map((t) => (t.id === newTask.id ? newTask : t)),
        );
      } else {
        const tasksToShift = tasks.filter((t) => t.order >= newTask.order);

        const shiftPromises = tasksToShift.map((t) =>
          storeTask({ ...t, order: t.order + 1 }),
        );

        await Promise.all([...shiftPromises, storeTask(newTask)]);

        setTasks((prevTasks) => {
          const updatedPrevTasks = prevTasks.map((t) =>
            t.order >= newTask.order ? { ...t, order: t.order + 1 } : t,
          );
          return [...updatedPrevTasks, newTask];
        });
      }

      closeModal();
    } catch (error) {
      console.error("Failed to save task", error);
    }
  };

  const handleDeleteTask = async (task: Task) => {
    try {
      await deleteTask(task);

      const tasksToShift = tasks.filter((t) => t.order > task.order);

      const shiftPromises = tasksToShift.map((t) =>
        storeTask({ ...t, order: t.order - 1 }),
      );
      await Promise.all(shiftPromises);

      setTasks((prevTasks) => {
        const remainingTasks = prevTasks.filter((t) => t.id !== task.id);

        return remainingTasks.map((t) =>
          t.order > task.order ? { ...t, order: t.order - 1 } : t,
        );
      });
    } catch (error) {
      console.error("Failed to delete a task and adjust orders", error);
    }
  };

  const handleDragDrop = async (targetIndex: number) => {
    if (currentDrag === null) return;

    const oldOrder = currentDrag;

    const newOrder = oldOrder < targetIndex ? targetIndex - 1 : targetIndex;

    if (oldOrder === newOrder) {
      setCurrentDrag(null);
      return;
    }

    try {
      const tasksToUpdate = tasks.map((t) => {
        if (t.order === oldOrder) {
          return { ...t, order: newOrder };
        } else if (
          oldOrder < newOrder &&
          t.order > oldOrder &&
          t.order <= newOrder
        ) {
          return { ...t, order: t.order - 1 };
        } else if (
          oldOrder > newOrder &&
          t.order >= newOrder &&
          t.order < oldOrder
        ) {
          return { ...t, order: t.order + 1 };
        }
        return t;
      });

      const changedTasks = tasksToUpdate.filter(
        (t) => t.order !== tasks.find((old) => old.id === t.id)?.order,
      );

      await Promise.all(changedTasks.map((t) => storeTask(t)));

      setTasks(tasksToUpdate);
      setCurrentDrag(null);
    } catch (error) {
      console.error("Failed to reorder tasks during drop", error);
    }
  };

  return (
    <>
      <div className={styles.Content}>
        <Header />
        <main>
          <List
            tasks={sortedTasks}
            addTask={openModal}
            setToggledBtn={setToggledBtn}
            deleteTask={handleDeleteTask}
            openModal={openModal}
            setCurrentDrag={setCurrentDrag}
            handleDragDrop={handleDragDrop}
          />
        </main>
        <Footer />
      </div>
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.closeBtn} onClick={closeModal}>
              <img src={Cross} alt="close icon" />
            </button>
            <TaskModal
              saveTask={handleSaveTask}
              order={toggledBtn}
              title={title}
              description={description}
              id={id}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default App;
