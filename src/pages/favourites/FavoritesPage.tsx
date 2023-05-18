import { Loader, Pagination } from "@mantine/core";
import { useGetFavoritesQuery } from "../../store/requests/api";
import Card from "../../components/card/Card";
import { useState } from "react";
import styles from "./FavoritesPage.module.scss";

const FavoritesPage = () => {
  const fab = [28317015, 46350274];
  const fabSplitted = fab.join("&ids[]=");

  const [activePage, setPage] = useState(1);

  const { data, isFetching } = useGetFavoritesQuery(fabSplitted);
  const vacanciesOnPage = 4;

  const totalVacancies = data?.total;

  const totalPages =
    totalVacancies > 500
      ? 500 / vacanciesOnPage
      : Math.ceil(totalVacancies / vacanciesOnPage);
  return (
    <div>
      <div className="container">
        <div className={styles.home}>
          <div className={styles.cards}>
            <div className={styles.cardsWrapper}>
              {isFetching ? (
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
              total={totalPages}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoritesPage;
