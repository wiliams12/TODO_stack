import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.Wrapper}>
      <h1 className={styles.Heading}>
        <span>TODO Stack</span>
        <span className={styles.SubHeading}>
          An app to visualize your tasks as a rearrangeable stack, allowing you
          to easily prioritize them.
        </span>
      </h1>
    </header>
  );
}

export default Header;
