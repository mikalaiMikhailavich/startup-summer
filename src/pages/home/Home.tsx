import { Loader, Pagination } from "@mantine/core";
import { useAppSelector } from "../../store/hooks";
import { useEffect, useState } from "react";
import { useGetVacanciesDataQuery } from "../../store/requests/api";
import Card from "../../components/card/Card";
import { Form } from "../../components/form/Form";
const Home = () => {
  const { industrySelect, salaryFrom, salaryTo } = useAppSelector(
    (state: any) => state.filter
  );

  const vacanciesOnPage = 4;
  const [activePage, setPage] = useState(1);

  const { data: card, isFetching: cardIsFetching } = useGetVacanciesDataQuery({
    page: activePage - 1,
    vacanciesOnPage,
    catalogueValue: industrySelect,
    salaryFrom,
    salaryTo,
  });

  const totalVacancies = card?.total;

  const totalPages =
    totalVacancies > 500
      ? 500 / vacanciesOnPage
      : Math.ceil(totalVacancies / vacanciesOnPage);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activePage]);
  return (
    <div className="">
      <Form setPage={setPage} />
      <div className="flex">
        {cardIsFetching ? (
          <Loader size={70} />
        ) : (
          card?.objects.map((elem: any, index: any) => {
            return (
              <Card
                key={index}
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
        total={totalPages}
      />
    </div>
  );
};

export default Home;
