import MainLogo from "../icons/MainLogo";
import Navbar from "../navbar/NavBar";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header className={`container`}>
      <div className={styles.container}>
        <MainLogo />
        <Navbar />
      </div>
    </header>
  );
};

export default Header;
