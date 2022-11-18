import { useState } from "react";
import { useTranslation } from "next-i18next";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SortSelector({ initSort, handleChangeSort }) {
  const [sort, setSort] = useState(initSort === "id desc" ? "" : initSort);
  const { t } = useTranslation("common");

  const handleChange = async (e) => {
    const { value } = e.target;
    setSort(value);
    handleChangeSort(value);
  };

  return (
    <FormControl variant="filled" sx={{ width: "32%" }}>
      <InputLabel id="sort-label">{t("sort_by")}</InputLabel>
      <Select
        labelId="sort-label"
        name="sort"
        value={sort}
        label={t("sort_by")}
        onChange={handleChange}
      >
        <MenuItem value={"title asc"}>{t("title_asc")}</MenuItem>
        <MenuItem value={"title desc"}>{t("title_desc")}</MenuItem>
        <MenuItem value={"createdAt asc"}>{t("date_asc")}</MenuItem>
        <MenuItem value={"createdAt desc"}>{t("date_desc")}</MenuItem>
      </Select>
    </FormControl>
  );
}
