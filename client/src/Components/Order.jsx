import React, { useState, useEffect, useContext } from "react";
import {useParams} from 'react-router'
import {useHistory} from 'react-router-dom'
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import AuthApi from "../Utility/AuthApi";
import axios from "axios";

const createOrder = async (obj) => {
  const url = `/api/orders/new`
  const data = await axios.post(url, obj)
  console.log('data', data)
}

const Order = () => {
  const session = useContext(AuthApi);
  const [data, setData] = useState([]);
  const [qty, setQty] = useState(0);
  const history = useHistory()

  const { id } = useParams();
  console.log("HELLO ID", id);  

  useEffect(() => {
    const fetchListing = async (id) => {
      console.log("id", id);
      const url = `/api/listings/${id}`;
      const data = await axios.get(url);
      console.log("DD", data.data);
      setData(data.data);
    };
    fetchListing(id);
  }, [id]);

  return (
    <div style={{ width: "80%", maxWidth: "1400px", margin: "0 auto" }}>
      <h1>Support this Groupbuy</h1>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexFlow: "row wrap",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <div
          style={{
            flex: 1.5,
            display: "flex",
            flexFlow: "column",
            padding: "25px",
            border: "1px solid #CDCDCD",
            alignItems: "center",
            justifyContent: "left",
          }}
        >
          <div style={{ width: "100%", display: "flex", flexFlow: "row",}}>
            <div
              className="image"
              style={{
                maxWidth: "355px",
                maxHeight: "200px",
                minWidth: "200px",
                minHeight: "200px",
                width: '60%',
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
              }}
            >
              <img
                src={data?.listing?.img}
                style={{ minHeight: "100%", minWidth: "100% " }}
                alt="transparent"
              />
            </div>
            <div
              style={{
                maxWidth: "50%",
                height: "200px",
                display: "flex",
                flexFlow: "column",
                padding: "25px",
                boxSizing: "border-box",
                alignItems: "flex-start",
                justifyContent: "left",
                textAlign: "left",
              }}
            >
              <h2 style={{ margin: "0" }}>{data?.listing?.name}</h2>
              <h3 style={{ marginTop: "10px" }}>{data?.listing?.description}</h3>
            </div>
          </div>
          <TextField
            name="qty_reserved"
            type="number"
            label="Quantity"
            variant="outlined"
            placeholder="Quantity to Reserve"
            margin="normal"
            value={qty}
            onChange={(event) => setQty(event.target.value)}
            required
            fullWidth
          />
        </div>
        <div
          style={{
            flex: 1,
            marginLeft: "4%",
            textAlign: "left",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "left",
          }}
        >
          <form onSubmit={(event) => {event.preventDefault(); createOrder({buyer_id: session?.auth?.userInfo?._id, listing_id: id, qty_reserved: qty}); history.push('/')}}>
            <h2>Summary</h2>
            <p>Quantity: {qty}</p>
            <p>Price: S${data?.listing?.price_per_unit}</p>
            <p>Total: S${qty * parseInt(data?.listing?.price_per_unit)}</p>
          <Button type="submit" variant="contained">Checkout</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Order;
