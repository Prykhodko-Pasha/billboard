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
import { updateBillAPI } from "../../../services/bills-api";
import { getBill } from "../../../prisma/bills";
import { useUserContext } from "../../../context/provider";
import isAllowedEditing from "../../../helpers/isAllowedEditing";
import MyCKEditor from "../../../components/CKEditor";
import categories from "../../../helpers/categories";

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

  useEffect(() => {
    user &&
      !isAllowedEditing(author.id, user?.id, user?.role) &&
      Router.push("/profile");
  }, [user]);

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
          />

          <div className="editor">
            <MyCKEditor
              text={text}
              editable={true}
              onEditorChange={handleEditorChange}
            />
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
  const { params } = context;
  const { id } = params;
  if (!id) return null;
  const billData = await getBill(id);
  return {
    props: {
      data: billData,
    },
  };
}
