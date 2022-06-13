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
import { getBill } from "../../prisma/bills";
import { useUserContext } from "../../context/provider";
import isAllowedEditing from "../../helpers/isAllowedEditing";
import { deleteBillAPI } from "../../services/bills-api";
import MyCKEditor from "../../components/CKEditor";

export default function Bill({ data }) {
  const { id, title, text, category, author } = data;

  const [user, setUser] = useUserContext();

  const handleDelete = async (e) => {
    try {
      const billId = e.currentTarget.id;
      const bill = await deleteBillAPI(billId);
      if (bill) Router.back();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button
        // variant="outlined"
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

          <div className="card_text">
            <MyCKEditor text={text} id={id} editable={false} />
          </div>

          <Typography sx={{ color: "#ccc" }} align="right">
            Author: {author.email}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}

export async function getServerSideProps(context) {
  //   const { params } = context;
  const { id } = context.params;
  if (!id) return null;
  const billData = await getBill(id);
  return {
    props: {
      data: billData,
    },
  };
}
