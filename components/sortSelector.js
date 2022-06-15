import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SortSelector({ initSort, handleChangeSort }) {
  const [sort, setSort] = useState(initSort === "id desc" ? "" : initSort);

  const handleChange = async (e) => {
    const { value } = e.target;
    setSort(value);
    handleChangeSort(value);
  };

  return (
    <FormControl variant="standard" sx={{ width: "30%", margin: "0 0 24px" }}>
      <InputLabel variant="standard" id="sort-label">
        Sort by
      </InputLabel>
      <Select
        // sx={{ width: "40%" }}
        labelId="sort-label"
        name="sort"
        value={sort}
        label="Sort by"
        onChange={handleChange}
      >
        <MenuItem value={"title asc"}>Title asc</MenuItem>
        <MenuItem value={"title desc"}>Title desc</MenuItem>
        <MenuItem value={"createdAt asc"}>Date asc</MenuItem>
        <MenuItem value={"createdAt desc"}>Date desc</MenuItem>
        {/* <MenuItem value={"author asc"}>Author asc</MenuItem>
        <MenuItem value={"author desc"}>Author desc</MenuItem> */}
      </Select>
    </FormControl>
  );
}
