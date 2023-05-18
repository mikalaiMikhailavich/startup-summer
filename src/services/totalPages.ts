export const totalPages = (totalVacancies: number | undefined) => {
  if (totalVacancies === undefined) {
    return 1;
  }
  const vacanciesOnPage = 4;
  const total =
    totalVacancies > 500
      ? 500 / vacanciesOnPage
      : Math.ceil(totalVacancies / vacanciesOnPage);
  return total;
};
