import styles from "./Utilities.module.css";
import { useRef } from "react";
import { initDB } from "../database";

interface Props {
  setShowBtns: (value: boolean) => void;
  showButtons: boolean;
}

function Utilites({ setShowBtns, showButtons }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const importedTasks = JSON.parse(text);

      const db = await initDB();
      const tx = db.transaction("tasks", "readwrite");

      for (const movie of importedTasks) {
        tx.store.put(movie);
      }

      await tx.done;
      console.log("Database successfully imported!");
      window.location.reload();
    } catch (error) {
      console.error("Failed to parse or import JSON:", error);
      alert("Invalid backup file. Please upload a valid JSON.");
    } finally {
      event.target.value = "";
    }
  };

  const handleExport = async () => {
    try {
      const db = await initDB();
      const allMovies = await db.getAll("tasks");

      const jsonString = JSON.stringify(allMovies, null, 2);
      const blob = new Blob([jsonString], { type: "application/json" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `tasks_backup_${new Date().toISOString().split("T")[0]}.json`;
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to export database:", error);
    }
  };

  return (
    <div className={styles.Wrapper}>
      <button
        className={styles.showBtns}
        onClick={() => {
          setShowBtns(!showButtons);
        }}
      >
        +
      </button>
      <button className={styles.Import} onClick={handleImportClick}>
        Import
      </button>
      <input
        type="file"
        accept=".json"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <button className={styles.Export} onClick={handleExport}>
        Export
      </button>
    </div>
  );
}

export default Utilites;
