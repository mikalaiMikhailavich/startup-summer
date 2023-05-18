import { FC } from "react";
import { Loader as Load } from "@mantine/core";
import styles from "./Loader.module.scss";

interface IProps {
  size: number;
}

const Loader: FC<IProps> = ({ size }) => {
  return (
    <div className={styles.container}>
      <Load size={size} />
    </div>
  );
};

export default Loader;
