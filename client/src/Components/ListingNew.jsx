import React, { useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import { Stack } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { Button } from "@mui/material";
import sgLocale from "date-fns/locale/en-GB";
import axios from "axios";
import AuthApi from "../Utility/AuthApi";
import Typography from "@mui/material/Typography";

// * TODO Add number of days between start and end date

const ListingNew = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [price, setPrice] = useState();
  const [minQty, setMinQty] = useState();
  const [maxQty, setMaxQty] = useState();
  const [file, setFile] = useState();
  const session = useContext(AuthApi);

  const createNewListing = async (listingData) => {
    console.log(listingData)
    const res = await uploadFile()
    listingData.img = res
    const url = `/api/listings/new`;
    const data = await axios.post(url, listingData);
    console.log(data)
  };

  const uploadFile = async () => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', process.env.CLOUDINARY_API ?? 'r8r3tzoy')

    const res = await axios.post('https://api.cloudinary.com/v1_1/mauwjh/image/upload', formData)
    return res.data.secure_url 
  }

  const setListing = () => ({
    name: name,
    description: description,
    start_date: startDate,
    closing_date: endDate,
    price_per_unit: price,
    min_quantity: minQty, 
    max_quantity: maxQty,
    img: '',
    seller_id: session.auth.userInfo._id,
  });

  return (
    <Typography>

    <div
      style={{ width: "80%", maxWidth: "1400px", margin: "0 auto" }}
      onSubmit={(event) => {
        event.preventDefault();
        console.log(name);
      }}
    >
      <h1>Create Listing</h1>
      <form onSubmit={() => createNewListing(setListing())}>
        <TextField
          name="name"
          label="Listing Title"
          variant="outlined"
          placeholder="Name your listing"
          margin="normal"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
          fullWidth
        />
        <p style={{ fontWeight: "bold", fontSize: "20px" }}>
          Upload a Photo for your Listing
        </p>
        <label htmlFor="contained-button-file">
          <input
            accept="image/*"
            id="contained-button-file"
            multiple
            type="file"
            onChange={(event) => {
              const file = event.target.files[0];
              console.log(file);
              setFile(file);
            }}
          />
        </label>
        <p style={{ fontWeight: "bold", fontSize: "20px" }}>
          About Your Groupbuy
        </p>
        <TextField
          name="description"
          label="Description"
          variant="outlined"
          placeholder="Describe what you are selling and include any details a buyer might be interested to know"
          margin="normal"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          required
          fullWidth
          multiline
          rows={4}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={sgLocale}>
          <Stack spacing={3} style={{ marginTop: "15px", marginBottom: "8px" }}>
            <DatePicker
              name="start_date"
              disablePast
              label="Start Date"
              openTo="day"
              views={["year", "month", "day"]}
              value={startDate}
              onChange={(newValue) => {
                setStartDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
            <DatePicker
              name="closing_date"
              disablePast
              label="Closing Date"
              openTo="day"
              views={["day"]}
              value={endDate}
              onChange={(newValue) => {
                setEndDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </Stack>
        </LocalizationProvider>
      
        <TextField
          name="price_per_unit"
          type="number"
          label="Price Per Unit"
          variant="outlined"
          placeholder="Price per unit"
          margin="normal"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          required
          fullWidth
        />
        <TextField
          name="min_quantity"
          type="number"
          label="Minimum Quantity"
          variant="outlined"
          placeholder="Minimum Quantity"
          margin="normal"
          value={minQty}
          onChange={(event) => setMinQty(event.target.value)}
          required
          fullWidth
        />
        <TextField
          name="max_quantity"
          type="number"
          label="Maximum Quantity"
          variant="outlined"
          placeholder="Maximum Quantity"
          margin="normal"
          value={maxQty}
          onChange={(event) => setMaxQty(event.target.value)}
          required
          fullWidth
        />
        <Button style={{ margin: "15px" }} type="submit" variant="contained">
          Submit
        </Button>
      </form>
    </div>
    </Typography>
  );
};

export default ListingNew;
