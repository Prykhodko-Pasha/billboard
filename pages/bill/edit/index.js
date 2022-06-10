import { useState } from "react";
import Router from "next/router";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { addBillAPI } from "../../../services/bills-api";
import { useUserContext } from "../../../context/provider";
import MyCKEditor from "../../../components/CKEditor";

export default function CreateBill() {
  const [user, setUser] = useUserContext();
  const [title, setTitle] = useState("");
  const [text, setText] = useState(null);

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

          <div
            className="editor"
            style={{
              width: "100%",
              borderRadius: "4px",
            }}
          >
            <MyCKEditor onEditorChange={handleEditorChange} />
          </div>

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
