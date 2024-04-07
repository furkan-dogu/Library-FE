import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { style } from "../helpers/modalStyle";
import CloseIcon from '@mui/icons-material/Close';
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

export default function Modals({
  open,
  handleClose,
  createBook,
  info,
  setInfo,
  updateBook,
}) {
  const handleChange = (e) => {
    if (e.target.name === "publicationYear") {
      setInfo({ ...info, [e.target.name]: Number(e.target.value) });
    } else {
      setInfo({ ...info, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setInfo(info);
    if (info?._id) {
      updateBook(info);
    } else {
      createBook(info);
    }
    handleClose();
  };

  let dates = []

  for(let i = (new Date().getFullYear()); i >= 1950; i--) {
    dates.push(i)
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        
        <Box sx={style} component="form" noValidate onSubmit={handleSubmit} position={"relative"}>
        <Button sx={{position: "absolute", top: 1, right: 1}} onClick={handleClose}>
            <CloseIcon />
        </Button>
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
          {/* <TextField
            required
            fullWidth
            id="publicationYear"
            name="publicationYear"
            label="Yayın Tarihi"
            type="number"
            value={info?.publicationYear}
            onChange={handleChange}
          /> */}
          <FormControl fullWidth>
            <InputLabel id="publicationYear-label">Yayın Tarihi</InputLabel>
            <Select
              labelId="publicationYear-label"
              id="publicationYear"
              name="publicationYear"
              label="Yayın Tarihi"
              type="number"
              value={info?.publicationYear}
              onChange={handleChange}
              required
            >
              {dates.map(date => (
                <MenuItem key={date} value={date}>
                  {date}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
            {info?._id ? "güncelle" : "ekle"}
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
