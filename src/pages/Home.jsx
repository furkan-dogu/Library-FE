import { Box, Button, Container, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Cards from "../components/Cards";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [data, setData] = useState({
    title: "",
    author: "",
    ISBN: "",
    genre: "",
    publicationYear: null,
    image: ""
  });

  const getBooks = async () => {
    try {
      const URL = process.env.REACT_APP_URL;

      const { data } = await axios.get(`http://${URL}`);
      setBooks(data.result.rows);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBook = async (id) => {
    try {
      const URL = process.env.REACT_APP_URL;
      await axios.delete(`http://${URL}/${id}`);
      getBooks()
    } catch (error) {
        console.log(error);
    }
  };

  const updateBook = async (id, edit) => {
    try {
      const URL = process.env.REACT_APP_URL;
      await axios.put(`http://${URL}/${id}`, edit);
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
          <Button variant="contained">Add New Book</Button>
        </Box>
      </Container>

      <Grid container gap={2} mt={3} justifyContent={"center"}>
        {books.map((book) => (
          <Grid item key={book.id}>
            <Cards book={book} deleteBook={deleteBook} updateBook={updateBook} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;
