import styles from "./Layout.module.css";

function Layout({ children }) {
  return (
    <>
      <header className={styles.header}>
        <h1>Crypto App</h1>
        <p>
          <a href="https://pjmzr.ir">pjmzr</a> | React.js New project
        </p>
      </header>
      {children}
      <footer className={styles.footer}>
        <p>Developed by Pejman Zarepour by love</p>
      </footer>
    </>
  );
}

export default Layout;
