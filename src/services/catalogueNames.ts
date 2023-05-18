import { Catalogue } from "../App";
type SelectDataType = {
  value: string;
  label: string;
};
export const catalogueNames = (data: Catalogue[] | undefined) => {
  const selectData: SelectDataType[] = [];

  if (data === undefined) {
    return "";
  }

  const calagoueNames = data
    ? data.map((el) =>
        selectData.push({ value: el.key.toString(), label: el.title_trimmed })
      )
    : "";
  return selectData;
};
