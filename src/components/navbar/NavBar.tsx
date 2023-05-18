// import { useDispatch } from "react-redux";

import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.scss";

const Navbar = () => {
  // const dispatch = useDispatch();

  const navbarData: any = [
    {
      id: 1,
      value: "Поиск вакансий",
      path: "/",
    },
    {
      id: 2,
      value: "Избранное",
      path: "/favourites",
    },
  ];

  return (
    <nav className={styles.container}>
      {navbarData.map(
        ({ id, value, path }: { id: number; value: string; path: string }) => (
          <NavLink
            key={id.toString()}
            to={path}
            className={({ isActive }: { isActive: boolean }): string =>
              isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
            }
          >
            {value}
          </NavLink>
        )
      )}
    </nav>
  );
};

export default Navbar;
