import { useState } from "react";
import { useTranslation } from "next-i18next";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchInput({ onEnter }) {
  const [search, setSearch] = useState("");
  const { t } = useTranslation("common");

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEnter(search.trim().toLowerCase());
  };

  return (
    <TextField
      variant="filled"
      sx={{ width: "32%" }}
      label={t("search")}
      value={search}
      onChange={handleChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <SearchIcon onClick={handleSubmit} sx={{ cursor: "pointer" }} />
          </InputAdornment>
        ),
      }}
    />
  );
}
