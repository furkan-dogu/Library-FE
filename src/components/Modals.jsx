import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { style } from "../helpers/modalStyle";
import { useState } from "react";

export default function Modals({ open, handleClose, createBook }) {

    const [info, setInfo] = useState({
        title: "",
        author: "",
        ISBN: "",
        genre: "",
        publicationYear: "",
        image: ""
    });

    const handleChange = (e) => {
        if(e.target.name === "publicationYear") {
            setInfo({...info, [e.target.name]: Number(e.target.value)})
        } else {

            setInfo({...info, [e.target.name]: e.target.value})
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setInfo(info)
        createBook(info)
        handleClose()
        setInfo("")
    }
    
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component="form" noValidate onSubmit={handleSubmit}>
          <TextField
            required
            fullWidth
            id="title"
            name="title"
            label="Kitap Adı"
            type="text"
            value={info?.title}
            onChange={handleChange}
          />
          <TextField
            required
            fullWidth
            id="author"
            name="author"
            label="Yazar Adı"
            type="text"
            value={info?.author}
            onChange={handleChange}
          />
          <TextField
            required
            fullWidth
            id="ISBN"
            name="ISBN"
            label="ISBN"
            type="text"
            value={info?.ISBN}
            onChange={handleChange}
          />
          <TextField
            required
            fullWidth
            id="publicationYear"
            name="publicationYear"
            label="Yayınlanma Yılı"
            type="number"
            value={info?.publicationYear}
            onChange={handleChange}
          />
          <TextField
            required
            fullWidth
            id="genre"
            name="genre"
            label="Tür"
            type="text"
            value={info?.genre}
            onChange={handleChange}
          />
          <TextField
            required
            fullWidth
            id="image"
            name="image"
            label="Kapak Resmi"
            type="text"
            value={info?.image}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            kaydet
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
