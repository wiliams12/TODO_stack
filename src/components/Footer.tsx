import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.Wrapper}>
      <a href="mailto:vilem.ucik@gmail.com" className={styles.Item}>
        vilem.ucik@gmail.com
      </a>
      <a
        href="https://github.com/wiliams12"
        target="_blank"
        className={styles.Item}
      >
        GitHub
      </a>
      <p className={styles.Item}>
        &copy; 2026 Vilém Učík. All rights reserved.
      </p>
      <a
        href="https://www.flaticon.com/free-icons/to-do-list"
        title="to do list icons"
        className={styles.Attribution}
      >
        To do list icons created by Graphics Plazza - Flaticon
      </a>
      <div className={styles.Attribution}>
        {" "}
        Icons made by{" "}
        <a
          href="https://www.flaticon.com/authors/pixel-perfect"
          title="Pixel perfect"
        >
          {" "}
          Pixel perfect{" "}
        </a>{" "}
        from{" "}
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com'
        </a>
      </div>
    </footer>
  );
}

export default Footer;
