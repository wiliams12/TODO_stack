import styles from "./NewTask.module.css";

interface Props {
  addTask: () => void;
  setToggledBtn: (value: number) => void;
  buttonOrder: number;
}

function newTask({ addTask, setToggledBtn, buttonOrder }: Props) {
  return (
    <button
      className={styles.Btn}
      onClick={() => {
        setToggledBtn(buttonOrder);
        addTask();
      }}
    >
      +
    </button>
  );
}

export default newTask;
