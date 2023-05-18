import { useParams } from "react-router-dom";
import { useGetVacancyByIdQuery } from "../../store/requests/api";

const SelectedVacancy = () => {
  const { id } = useParams();
  const { data } = useGetVacancyByIdQuery(id);
  //   const html:  =

  return (
    <div className="container">
      <div dangerouslySetInnerHTML={{ __html: data?.vacancyRichText }} />
    </div>
  );
};

export default SelectedVacancy;
