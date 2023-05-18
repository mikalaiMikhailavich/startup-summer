import { Loader, Pagination } from "@mantine/core";
import { useAppSelector } from "../../store/hooks";
import { useEffect, useState } from "react";
import { useGetVacanciesDataQuery } from "../../store/requests/api";
import Card from "../../components/card/Card";
import { Form } from "../../components/form/Form";
import styles from "./Home.module.scss";
import { totalPages } from "../../services/totalPages";

const Home = () => {
  const { industrySelect, salaryFrom, salaryTo } = useAppSelector(
    (state: any) => state.filter
  );

  const [activePage, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activePage]);

  const { data, isFetching: cardIsFetching } = useGetVacanciesDataQuery({
    page: activePage - 1,
    catalogueValue: industrySelect,
    salaryFrom,
    salaryTo,
  });
  const totalPage = totalPages(data?.total);

  return (
    <div className="container">
      <div className={styles.home}>
        <Form setPage={setPage} />
        <div className={styles.cards}>
          <div className={styles.cardsWrapper}>
            <input type="text" name="" id="" />
            <input type="button" name="" id="" />
            {cardIsFetching ? (
              <div className={styles.loader}>
                <Loader size={70} />
              </div>
            ) : (
              data?.objects.map((elem: any, index: any) => {
                return (
                  <Card
                    key={index}
                    id={elem.id}
                    profession={elem.profession}
                    firm_name={elem.firm_name}
                    townTitle={elem.town?.title}
                    typeOfWorkTitle={elem?.type_of_work.title}
                    payment_from={elem?.payment_from}
                    payment_to={elem?.payment_to}
                    currency={elem?.currency}
                  />
                );
              })
            )}
          </div>
          <Pagination
            position="center"
            value={activePage}
            onChange={setPage}
            total={totalPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
