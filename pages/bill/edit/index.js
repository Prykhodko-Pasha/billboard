import { useState } from "react";
import Router from "next/router";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { addBillAPI } from "../../../services/bills-api";
import { useUserContext } from "../../../context/provider";
import MyCKEditor from "../../../components/CKEditor";
import categories from "../../../helpers/categories";

export default function CreateBill() {
  const [user, setUser] = useUserContext();
  const [title, setTitle] = useState("");
  const [text, setText] = useState(null);
  const [category, setCategory] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case "title":
        setTitle(value);
        break;
      default:
        return;
    }
  };

  const handleEditorChange = (editorState) => {
    setText(editorState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const authorId = user.id;
      const credentials = {
        title,
        text,
        category,
        authorId,
      };
      const bill = await addBillAPI(credentials);
      if (bill) await Router.push("/profile");
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  return (
    <Container
      component="main"
      maxWidth="md"
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "4px",
      }}
    >
      <Box
        sx={{
          width: "100%",
          textAlign: "center",
          padding: "50px",
          borderRadius: "40px",
          position: "relative",
        }}
      >
        <Typography component="h1" variant="h5">
          Create a bill
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            mt: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label="Title"
            name="title"
            value={title}
            autoFocus
            onChange={handleChange}
          />

          <div className="editor">
            <MyCKEditor onEditorChange={handleEditorChange} editable={true} />
          </div>

          <FormControl margin="normal" sx={{ width: "50%" }}>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              // sx={{ width: "50%" }}
              labelId="category-label"
              name="category"
              value={category}
              label="Category"
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((item, index) => (
                <MenuItem value={item} key={index}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{
              margin: "0 auto",
              mt: 3,
            }}
          >
            Create
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
