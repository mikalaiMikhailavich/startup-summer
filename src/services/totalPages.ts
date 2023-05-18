export const totalPages = (totalVacancies: number) => {
  const vacanciesOnPage = 4;
  const total =
    totalVacancies > 500
      ? 500 / vacanciesOnPage
      : Math.ceil(totalVacancies / vacanciesOnPage);
  return total;
};
