import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useEffect, useState } from "react";
import Cards from "../components/Cards";
import Modals from "../components/Modals";
import loadingGif from "../assets/loading.gif";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const [info, setInfo] = useState({
    title: "",
    author: "",
    ISBN: "",
    genre: "",
    publicationYear: "",
    image: "",
  });

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setInfo("");
  };

  const URL = "library-be-two.vercel.app/books";

  const getBooks = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`https://${URL}`);
      setBooks(data.result);
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteBook = async (id) => {
    try {
      await axios.delete(`https://${URL}/${id}`);
      getBooks();
    } catch (error) {
      console.log(error);
    } 
  }

  const updateBook = async (edit) => {
    try {
      await axios.put(`https://${URL}/${edit._id}`, edit);
      getBooks();
    } catch (error) {
      console.log(error);
    } 
  };

  const createBook = async (info) => {
    try {
      await axios.post(`https://${URL}`, info);
      getBooks();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <Box>
      <Container>
        <Typography variant="h4" color={"primary"} m={4} textAlign={"center"}>
          Kitaplarım
        </Typography>
        <Box display={"flex"} justifyContent={"flex-end"} mr={3}>
          <Button variant="contained" onClick={handleOpen}>
            K<span style={{ textTransform: "uppercase" }}>İ</span>TAP EKLE
          </Button>
          <Modals
            open={open}
            handleClose={handleClose}
            createBook={createBook}
            info={info}
            setInfo={setInfo}
            updateBook={updateBook}
          />
        </Box>
      </Container>
      {loading && (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <img src={loadingGif} alt="Yükleniyor..." width={250} />
        </Box>
      )}
      {!books.length && !loading ? (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Typography color={"red"} textAlign={"center"} fontSize={24}>
            Kayıtlı Kitap Bulunmamaktadır.
          </Typography>
        </Box>
      ) : (
        <Grid container gap={2} mt={3} justifyContent={"center"}>
          {books.map((book) => (
            <Grid item key={book._id}>
              <Cards
                book={book}
                deleteBook={deleteBook}
                setInfo={setInfo}
                handleOpen={handleOpen}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Home;
