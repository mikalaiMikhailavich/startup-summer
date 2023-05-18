import { Outlet } from "react-router-dom";
import styles from "./Layout.module.scss";
import Header from "../header/Header";

const Layout = () => {
  return (
    <div className="app">
      <Header />
      <main className={styles.container}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
