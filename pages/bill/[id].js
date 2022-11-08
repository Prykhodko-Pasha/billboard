import { useEffect, useState } from "react";
import Link from "next/Link";
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
import Rating from "@mui/material/Rating";

import { getBill } from "../../prisma/bills";
import { useUserContext } from "../../context/provider";
import isAllowedEditing from "../../helpers/isAllowedEditing";
import { deleteBillAPI } from "../../services/bills-api";
import MyCKEditor from "../../components/CKEditor";
import transformDateFormat from "../../helpers/transformDateFormat";
import {
  addCommentAPI,
  deleteCommentAPI,
  getCommentsAPI,
} from "../../services/comments-api";
import { getComments } from "../../prisma/comments";
import { getVoteAPI, postVoteAPI } from "../../services/votes-api";

export default function Bill({ billData, commentsData }) {
  const { id, title, text, category, author, createdAt, rating } = billData;
  const formattedDate = transformDateFormat(createdAt);

  const [user, setUser] = useUserContext();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(commentsData);
  const [value, setValue] = useState(0);
  const [averageRating, setAverageRating] = useState(rating);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      try {
        setVote(id, user.id);
      } catch (error) {
        setError(error);
      }
    }
  }, [user, id]);

  const setVote = async (billId, userId) => {
    const vote = await getVoteAPI({ billId, userId });
    console.log("vote :>> ", vote);
    setValue(vote?.value || 0);
  };

  const handleDeleteBill = async (e) => {
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
      // console.log("newComment :>> ", newComment);
      if (newComment) {
        const refreshedComments = await getCommentsAPI(id);
        setComments(refreshedComments);
        setComment("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteComment = async (e) => {
    e.preventDefault();
    try {
      const commentId = e.currentTarget.id;
      const deletedComment = await deleteCommentAPI(commentId);
      if (deletedComment) {
        const refreshedComments = await getCommentsAPI(id);
        setComments(refreshedComments);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangeRating = async (e, newValue) => {
    e.preventDefault();
    try {
      const billId = id;
      const userId = user.id;
      const credentials = { value: newValue, userId, billId };
      const newRating = await postVoteAPI(credentials);
      // console.log("newRating :>> ", newRating);
      if (newRating) {
        setAverageRating(newRating);
      }
    } catch (error) {
      console.error(error);
    }
    setValue(newValue);
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
      <Card
        sx={{
          minWidth: "80%",
          background: "linear-gradient(90deg,#e5e6e6 50%,transparent)",
        }}
        key={id}
      >
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
                  onClick={(e) => handleDeleteBill(e)}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            )}
          </Box>

          <Typography mb={1} sx={{ color: "#aaa" }} align="left">
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
            <Typography sx={{ color: "#aaa" }} align="left">
              {author.email} | {formattedDate}
            </Typography>
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                fontSize: "24px",
                fontWeight: "600",
                color: "#aaa",
              }}
              align="right"
            >
              {averageRating.toFixed(1)}
              <Rating
                value={value}
                disabled={!user}
                onChange={(e, newValue) => handleChangeRating(e, newValue)}
              />
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
            <div key={idx}>
              <ListItem alignItems="center">
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
                        variant="caption"
                        color="text.secondary"
                      >
                        {transformDateFormat(createdAt, true)}
                      </Typography>
                    </>
                  }
                  secondary={text}
                />

                {isAllowedEditing(author.id, user?.id, user?.role) && (
                  <Box sx={{ display: "flex", ml: 1 }}>
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
                      onClick={(e) => handleDeleteComment(e)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                )}
              </ListItem>
              {idx !== comments.length - 1 && (
                <Divider variant="inset" component="li" />
              )}
            </div>
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
