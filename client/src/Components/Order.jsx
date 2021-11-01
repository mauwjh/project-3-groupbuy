import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import seedData from "../Models/ListingSeed";
import seedOrders from "../Models/OrderSeed";
import ProgressBar from "./ProgressBar";
import { Grid } from "@mui/material";
import { differenceInDays } from "date-fns";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";

const Order = () => {
  const [data, setData] = useState([]);
  const [orders, setOrders] = useState([]);
  const [numOfOrders, setNumOfOrders] = useState(0);
  const [qty, setQty] = useState();

  useEffect(() => {
    setData(seedData);
    setOrders(seedOrders);
    setNumOfOrders(
      Math?.round(
        (orders?.map((a) => a?.qty_reserved)?.reduce((a, b) => a + b, 0) /
          parseInt(data[0]?.max_quantity)) *
          100
      )
    );
  }, [data, orders]);

  const timeRemaining = differenceInDays(
    new Date(seedData[0].closing_date),
    new Date()
  );

  return (
    <div style={{ width: "80%", maxWidth: "1400px", margin: "0 auto" }}>
      <h1>{data[0]?.name}</h1>
      <h4>{data[0]?.description}</h4>
      <div
        className="details-container"
        style={{ display: "flex", flexFlow: "row wrap" }}
      >
        <div
          className="image"
          style={{
            width: "65%",
            height: "500px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <img
            src={data[0]?.img}
            style={{ minHeight: "100%", minWidth: "100% " }}
            alt="transparent"
          />
        </div>
        <div
          style={{
            display: "flex",
            height: "500px",
            width: "32%",
            flexFlow: "column",
            justifyContent: "left",
            alignItems: "flex-start",
            marginLeft: "3%",
          }}
        >
          <Grid spacing={1} container>
            <Grid xs item>
              <ProgressBar data={numOfOrders} />
            </Grid>
          </Grid>
          <p
            style={{ fontSize: "36px", fontWeight: "bold", marginTop: "15px" }}
          >
            {numOfOrders}
          </p>
          <p style={{ marginTop: "-35px" }}>
            units reserved out of a target of {data[0]?.max_quantity} units
          </p>
          <p style={{ fontSize: "36px", fontWeight: "bold" }}>
            {orders?.length}
          </p>
          <p style={{ marginTop: "-35px" }}>
            buyers have participated in this groupbuy
          </p>
          <p style={{ fontSize: "36px", fontWeight: "bold" }}>
            {timeRemaining}
          </p>
          <p style={{ marginTop: "-35px", marginBottom: "65px" }}>
            days remaining
          </p>
        </div>
      </div>
      <h2>Support this groupbuy</h2>
      <form>
        <TextField
          name="qty_reserved"
          label="Quantity"
          variant="outlined"
          placeholder="Quantity to Reserve"
          margin="normal"
          value={qty}
          onChange={(event) => setQty(event.target.value)}
          required
          fullWidth
        />
        <Button style={{ margin: "15px" }} type="submit" variant="contained">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Order;
