import { use, useState, useEffect } from "react";
import { getTasks, initDB } from "./database";
import { Task } from "./types";
import styles from "./App.module.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import List from "./components/List";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    async function setup() {
      await initDB();
      const savedTasks = await getTasks();
      setTasks(savedTasks);
    }
    setup();
  }, []);

  return (
    <div className={styles.Content}>
      <Header />
      <main>
        <List tasks={tasks} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
