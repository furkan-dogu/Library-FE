import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Cards({ book, deleteBook, setInfo, handleOpen }) {
  const handleEdit = () => {
    handleOpen();
    setInfo(book);
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        width: "300px",
        height: "420px",
      }}
    >
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {book?.title}
        </Typography>
      </CardContent>
      <Box width={"100%"} ml={4}>
        <Typography variant="body2" color="text.secondary">
          ISBN : {book?.ISBN}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Yayınlanma Yılı : {book?.publicationYear}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Tür : {book?.genre}
        </Typography>
      </Box>
      <CardMedia
        component="img"
        alt={book?.title}
        height="200"
        image={book?.image}
        sx={{ objectFit: "contain", padding: 1 }}
      />
      <Box width={"100%"} ml={4}>
        <Typography variant="body2" color="text.secondary">
          Yazar : {book?.author}
        </Typography>
      </Box>
      <CardActions>
        <Button size="small" onClick={handleEdit}>
          <EditIcon />
        </Button>
        <Button size="small" onClick={() => deleteBook(book?.id)}>
          <DeleteIcon />
        </Button>
      </CardActions>
    </Card>
  );
}
