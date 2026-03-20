import { use, useState, useEffect, useMemo } from "react";
import { getTasks, initDB, storeTask } from "./database";
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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveTask = async (newTask: Task) => {
    try {
      await storeTask(newTask);
      setTasks((prevTasks) => [...prevTasks, newTask]);
      closeModal();
    } catch (error) {
      console.error("Failed to save task", error);
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
            <TaskModal saveTask={handleSaveTask} order={toggledBtn} />
          </div>
        </div>
      )}
    </>
  );
}

export default App;
