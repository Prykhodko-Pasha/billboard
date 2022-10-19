import { useState } from "react";
import Link from "next/link";
import Router from "next/router";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";

import { getBill } from "../../prisma/bills";
import { useUserContext } from "../../context/provider";
import isAllowedEditing from "../../helpers/isAllowedEditing";
import { deleteBillAPI } from "../../services/bills-api";
import MyCKEditor from "../../components/CKEditor";
import transformDateFormat from "../../helpers/transformDateFormat";
import { addCommentAPI, getCommentsAPI } from "../../services/comments-api";
import { getComments } from "../../prisma/comments";

export default function Bill({ billData, commentsData }) {
  const { id, title, text, category, author, createdAt } = billData;
  const formattedDate = transformDateFormat(createdAt);

  const [user, setUser] = useUserContext();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(commentsData);
  const [error, setError] = useState(null);

  const handleDelete = async (e) => {
    try {
      const billId = e.currentTarget.id;
      const bill = await deleteBillAPI(billId);
      if (bill) Router.back();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const authorId = user.id;
      const billId = id;
      const credentials = { text: comment, authorId, billId };
      const newComment = await addCommentAPI(credentials);
      console.log("newComment :>> ", newComment);
      if (newComment) {
        const refreshedComments = await getCommentsAPI(id);
        setComments(refreshedComments);
        setComment("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* COME BACK BUTTON */}
      <Button
        size="large"
        sx={{
          alignSelf: "flex-start",
          ml: 3,
          mb: 3,
        }}
        startIcon={<ArrowBackIosNewIcon />}
        onClick={() => Router.back()}
      >
        Come back
      </Button>

      {/* BILL */}
      <Card sx={{ minWidth: "80%" }}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h4" component="div">
              {title}
            </Typography>
            {isAllowedEditing(author.id, user?.id, user?.role) && (
              <div>
                <Link href={`/bill/edit/${id}`}>
                  <IconButton
                    aria-label="edit"
                    size="large"
                    align="right"
                    sx={{
                      "&:hover": {
                        backgroundColor: "#3498db",
                        color: "#fff",
                      },
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </Link>
                <IconButton
                  aria-label="delete"
                  size="large"
                  align="right"
                  sx={{
                    "&:hover": {
                      backgroundColor: "#d32f2f",
                      color: "#fff",
                    },
                  }}
                  id={id}
                  onClick={(e) => handleDelete(e)}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            )}
          </Box>

          <Typography mb={1} sx={{ color: "#ccc" }} align="left">
            {category}
          </Typography>

          <div className="bill_text">
            <MyCKEditor text={text} id={id} editable={false} />
          </div>

          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: "16px",
            }}
          >
            <Typography sx={{ color: "#ccc" }} align="left">
              {formattedDate}
            </Typography>
            <Typography sx={{ color: "#ccc" }} align="right">
              Author: {author.email}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* COMMENT INPUT */}
      {user && (
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            minWidth: "80%",
            mt: 5,
            pr: 2,
            pl: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              minWidth: "100%",
              // mb: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Avatar
              alt="Remy Sharp"
              src="/avatar.png"
              sx={{
                // minWidth: "100%",
                mt: 2,
                mb: 1,
                mr: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            />
            <TextField
              margin="normal"
              fullWidth
              id="comment"
              label="Add comment"
              name="comment"
              value={comment}
              autoComplete="comment"
              onChange={(e) => setComment(e.currentTarget.value)}
              variant="standard"
              // error={Boolean(error?.comment)}
              // helperText={error?.comment}
            />
          </Box>

          <Box
            sx={{
              minWidth: "100%",
              mb: 2,
              display: "flex",
              justifyContent: "right",
            }}
          >
            <Button variant="outlined" size="large" disabled={!comment}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={!comment}
              sx={{
                ml: 2,
              }}
            >
              Send
            </Button>
          </Box>
        </Box>
      )}

      {/* COMMENTS LIST */}
      {comments && (
        <List sx={{ width: "80%" }}>
          {comments.map(({ id, text, author, createdAt }, idx) => (
            <>
              <ListItem alignItems="center" key={id}>
                <ListItemAvatar>
                  <Avatar alt={author.name} src="/avatar.png" />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <>
                      {author.name}
                      <Typography
                        ml={1}
                        component="span"
                        variant="body2"
                        color="text.secondary"
                      >
                        {createdAt}
                      </Typography>
                    </>
                  }
                  secondary={text}
                />
                {/* {isAllowedEditing(author.id, user?.id, user?.role) && ( */}
                <Box sx={{ display: "flex", ml: 1 }}>
                  <Link href={`/bill/edit/${id}`}>
                    <IconButton
                      aria-label="edit"
                      size="large"
                      align="right"
                      sx={{
                        "&:hover": {
                          backgroundColor: "#3498db",
                          color: "#fff",
                        },
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </Link>
                  <IconButton
                    aria-label="delete"
                    size="large"
                    align="right"
                    sx={{
                      "&:hover": {
                        backgroundColor: "#d32f2f",
                        color: "#fff",
                      },
                    }}
                    id={id}
                    // onClick={(e) => handleDelete(e)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
                {/* )} */}
              </ListItem>
              {idx !== comments.length - 1 && (
                <Divider variant="inset" component="li" />
              )}
            </>
          ))}
        </List>
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;
  if (!id) return null;
  const billData = await getBill(id);
  const commentsData = await getComments(id);
  return {
    props: {
      billData: JSON.parse(JSON.stringify(billData)),
      commentsData: JSON.parse(JSON.stringify(commentsData)),
    },
  };
}
