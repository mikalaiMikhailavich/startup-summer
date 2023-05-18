import { useNavigate } from "react-router-dom";
import { Favorite } from "../icons/Favorite";
import styles from "./Card.module.scss";
interface IProps {
  id: string;
  profession: string;
  firm_name?: string;
  townTitle?: string;
  typeOfWorkTitle?: string;
  payment_to?: string;
  payment_from?: string;
  currency?: string;
}

const Card = (props: IProps) => {
  const navigate = useNavigate();
  const {
    id,
    profession,
    townTitle,
    typeOfWorkTitle,
    payment_from,
    payment_to,
    currency,
  } = props;

  return (
    <div className={`${styles.container}`}>
      <div className={styles.mainInfo}>
        <p
          className={styles.title}
          onClick={() => navigate(`/favourites/${id}`)}
        >
          {profession}
        </p>

        <div className={styles.cardSalaryAndTypeOfWork}>
          <p className={styles.salaryInfo}>
            {+payment_from! === 0 && +payment_to! > 0
              ? `до ${payment_to} ${currency}`
              : +payment_from! > 0 && +payment_to! === 0
              ? `от ${payment_from} ${currency}`
              : `от ${payment_from} - до ${payment_to} ${currency}`}
          </p>
          <span className={styles.dot}>•</span>
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
