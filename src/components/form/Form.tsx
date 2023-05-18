import { Button, Select, NumberInput } from "@mantine/core";
import { Loader } from "@mantine/core";
import { useForm } from "@mantine/form";

import { IconChevronDown } from "@tabler/icons-react";

import { useGetCatalogueDataQuery } from "../../store/requests/api";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { reset, setFilter } from "../../store/reducers/filter";
import styles from "./Form.module.scss";

interface IProps {
  setPage: (number: number) => void;
}

export function Form(props: IProps) {
  const { setPage } = props;
  const dispatch = useAppDispatch();
  const { industrySelect, salaryFrom, salaryTo } = useAppSelector(
    (state: any) => state.filter
  );
  const { data, isFetching } = useGetCatalogueDataQuery();
  const form = useForm({
    initialValues: {
      industrySelectValue: industrySelect,
      salaryFrom,
      salaryTo,
    },
  });

  type SelectDataType = {
    value: string;
    label: string;
  };

  const selectData: SelectDataType[] = [];

  const catalogueNames = data
    ? data.forEach((el) =>
        selectData.push({ value: el.key.toString(), label: el.title_trimmed })
      )
    : "";
  return (
    // <div className={styles.container}>
    <form
      className={styles.container}
      onReset={form.onReset}
      onSubmit={form.onSubmit((values) => {
        const { industrySelectValue, salaryFrom, salaryTo } = values;

        setPage(1);
        dispatch(
          setFilter({
            industrySelect: industrySelectValue,
            salaryFrom,
            salaryTo,
          })
        );
      })}
    >
      <div className={styles.header}>
        <h3 className={styles.formTitle}>Фильтры</h3>
        <div>
          <button
            className={styles.reset}
            type="reset"
            onClick={() => {
              dispatch(reset());
              setPage(1);
            }}
          >
            Сбросить все
          </button>
        </div>
      </div>
      <div>
        <label> Отрасль</label>
        <Select
          data-elem="industry-select"
          icon={isFetching ? <Loader size={21} /> : null}
          // w={{ base: 250, sm: 400, lg: 500 }}
          clearable
          searchable
          placeholder={"Введите отрасль"}
          data={selectData}
          rightSectionWidth={40}
          rightSection={<IconChevronDown size="1rem" />}
          {...form.getInputProps("industrySelectValue")}
          styles={{
            rightSection: { pointerEvents: "none", paddingRight: "12px" },
          }}
        />
      </div>

      <div>
        <label> Оклад</label>

        <NumberInput
          defaultValue={""}
          placeholder="От"
          radius="md"
          {...form.getInputProps("salaryFrom")}
          min={0}
          max={form.values.salaryTo}
          step={100}
        />
        <NumberInput
          defaultValue={""}
          placeholder="До"
          radius="md"
          {...form.getInputProps("salaryTo")}
          min={form.values.salaryFrom}
        />
      </div>
      <Button type="submit">Submit</Button>
    </form>
    // </div>
  );
}
