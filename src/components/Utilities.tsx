import styles from "./Utilities.module.css";

interface Props {
  setShowBtns: (value: boolean) => void;
  showButtons: boolean;
}

function Utilites({ setShowBtns, showButtons }: Props) {
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
      <button className={styles.Import} onClick={() => {}}>
        Import
      </button>
      <button className={styles.Export} onClick={() => {}}>
        Eport
      </button>
    </div>
  );
}

export default Utilites;
