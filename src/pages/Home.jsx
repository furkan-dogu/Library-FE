import { Box, Button, Container, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Cards from "../components/Cards";
import Modals from "../components/Modals";

const Home = () => {
  const [books, setBooks] = useState([]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getBooks = async () => {
    try {
      const URL = process.env.REACT_APP_URL;

      const { data } = await axios.get(`https://${URL}`);
      setBooks(data.result.rows);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBook = async (id) => {
    try {
      const URL = process.env.REACT_APP_URL;
      await axios.delete(`https://${URL}/${id}`);
      getBooks()
    } catch (error) {
        console.log(error);
    }
  };

  const updateBook = async (id, edit) => {
    try {
      const URL = process.env.REACT_APP_URL;
      await axios.put(`https://${URL}/${id}`, edit);
      getBooks()
    } catch (error) {
        console.log(error);
    }
  };

  const createBook = async (info) => {
    try {
      const URL = process.env.REACT_APP_URL;
      await axios.post(`https://${URL}`, info);
      getBooks()
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
          Library Management System
        </Typography>
        <Box display={"flex"} justifyContent={"flex-end"} mr={3}>
          <Button variant="contained" onClick={handleOpen}>yeni kitap ekle</Button>
          <Modals open={open} handleClose={handleClose} createBook={createBook} />
        </Box>
      </Container>

      <Grid container gap={2} mt={3} justifyContent={"center"}>
        {books.map((book) => (
          <Grid item key={book.id}>
            <Cards book={book} deleteBook={deleteBook} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;
