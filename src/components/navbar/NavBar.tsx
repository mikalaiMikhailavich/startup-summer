import { useDispatch } from "react-redux";

// import styles from "./Navbar.module.scss";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();

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
    <nav>
      {navbarData.map(
        ({ id, value, path }: { id: any; value: any; path: any }) => (
          <NavLink key={id.toString()} to={path}>
            {value}
          </NavLink>
        )
      )}
    </nav>
  );
};

export default Navbar;
