import { Loader, Pagination } from "@mantine/core";
import { useAppSelector } from "../../store/hooks";
import { FormEventHandler, useEffect, useState } from "react";
import { useGetVacanciesDataQuery } from "../../store/requests/api";
import Card from "../../components/card/Card";
import { Form } from "../../components/form/Form";
import styles from "./Home.module.scss";
import { totalPages } from "../../services/totalPages";

const Home = () => {
  const { industrySelect, salaryFrom, salaryTo } = useAppSelector(
    (state) => state.filter
  );
  const [inputText, setInputText] = useState("");
  const [searchValue, setSearchValue] = useState("");
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
    keyword: searchValue,
  });

  const totalPage = totalPages(data?.total);
  console.log(data);

  return (
    <div className="container">
      <div className={styles.home}>
        <Form setPage={setPage} />
        <div className={styles.cards}>
          <div className={styles.cardsWrapper}>
            <input
              type="text"
              name="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <input
              type="submit"
              name=""
              id=""
              onClick={() => setSearchValue(inputText)}
            />

            {cardIsFetching ? (
              <div className={styles.loader}>
                <Loader size={70} />
              </div>
            ) : (
              data?.objects.map((elem: any, index: any) => {
                return <Card key={elem.id} data={elem} />;
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
