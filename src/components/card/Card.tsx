import { useNavigate } from "react-router-dom";
import { Favorite } from "../icons/Favorite";
import styles from "./Card.module.scss";
import { ICardData } from "../../types/types";

interface IProps {
  data: ICardData;
}

const Card = (props: IProps) => {
  const navigate = useNavigate();
  const {
    data: {
      id,
      profession,
      town,
      type_of_work,
      payment_from,
      payment_to,
      currency,
    },
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
          <p>{type_of_work?.title}</p>
        </div>

        <p>{town?.title}</p>
      </div>
      <div>
        <Favorite isFavorite={false} />
      </div>
    </div>
  );
};

export default Card;
