import { useEffect, useState } from "react";
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
import FormHelperText from "@mui/material/FormHelperText";
import { updateBillAPI } from "../../../services/bills-api";
import { getBill } from "../../../prisma/bills";
import { useUserContext } from "../../../context/provider";
import isAllowedEditing from "../../../helpers/isAllowedEditing";
import MyCKEditor from "../../../components/CKEditor";
import categories from "../../../helpers/categories";
import { billSchema } from "../../../helpers/validation";

export default function EditBill({ data }) {
  const {
    id,
    title: initTitle,
    text: initText,
    category: initCategory,
    author,
  } = data;

  const [user, setUser] = useUserContext();
  const [title, setTitle] = useState(initTitle || "");
  const [text, setText] = useState(initText);
  const [category, setCategory] = useState(initCategory);
  const [error, setError] = useState(null);

  useEffect(() => {
    user &&
      !isAllowedEditing(author.id, user?.id, user?.role) &&
      Router.push("/profile");
  }, [user]);

  useEffect(() => {
    // if (!title && !text && !category) return; // skip the first render
    const formData = { title, text, category };
    const errors = {};
    billSchema
      .validate(formData, { abortEarly: false })
      .then(() => {
        setError(null);
      })
      .catch((err) => {
        err.inner.forEach(({ path, message }) => {
          errors[path] = message;
        });
        setError(errors);
      });
  }, [title, text, category]);

  const handleChange = (e) => {
    setTitle(e.currentTarget.value);
  };

  const handleEditorChange = (editorState) => {
    setText(editorState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const credentials = { id, title, text, category };
      const bill = await updateBillAPI(credentials);
      if (bill) Router.back();
    } catch (error) {
      // await setUser({ error: error.response.data.message });
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
            error={Boolean(error?.title)}
            helperText={error?.title}
          />

          <FormControl fullWidth error={Boolean(error?.text)}>
            <div
              className={
                Boolean(error?.text) ? "editor editor_error" : "editor"
              }
            >
              {" "}
              <MyCKEditor
                text={text}
                editable={true}
                onEditorChange={handleEditorChange}
              />
            </div>
            <FormHelperText>{error?.text}</FormHelperText>
          </FormControl>

          <FormControl margin="normal" sx={{ width: "50%" }}>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
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
            <FormHelperText>{error?.category}</FormHelperText>
          </FormControl>

          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              variant="outlined"
              size="large"
              sx={{
                margin: "0 auto",
                mt: 3,
              }}
              onClick={() => Router.back()}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{
                margin: "0 auto",
                mt: 3,
              }}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;
  if (!id) return null;
  const billData = await getBill(id);
  return {
    props: {
      data: JSON.parse(JSON.stringify(billData)),
    },
  };
}
