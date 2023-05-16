import { Favorite } from "../icons/Favorite";
import styles from "./Card.module.css";
interface IProps {
  profession: string;
  firm_name?: string;
  townTitle?: string;
  typeOfWorkTitle?: string;
  payment_to?: string;
  payment_from?: string;
  currency?: string;
}

const Card = (props: IProps) => {
  const {
    profession,
    firm_name,
    townTitle,
    typeOfWorkTitle,
    payment_from,
    payment_to,
    currency,
  } = props;
  return (
    <div className={styles.container}>
      <div className={styles.mainInfo}>
        <p className={styles.title}>{profession}</p>

        <div className={styles.salaryInfo}>
          <p>
            {+payment_from! === 0 && +payment_to! > 0
              ? `до ${payment_to} ${currency}`
              : +payment_from! > 0 && +payment_to! === 0
              ? `от ${payment_from} ${currency}`
              : `от ${payment_from} - до ${payment_to} ${currency}`}
          </p>
          <div>•</div>
          <p>{typeOfWorkTitle}</p>
        </div>

        <p>{townTitle}</p>
      </div>
      <div>
        <Favorite isFavorite={false} />
      </div>
    </div>
  );
};

export default Card;
