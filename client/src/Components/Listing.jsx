import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import seedData from "../Models/ListingSeed";
import seedOrders from "../Models/OrderSeed";
import ProgressBar from "./ProgressBar";
import { Grid } from "@mui/material";
import { differenceInDays } from "date-fns";
import { Button } from "@mui/material";
import axios from "axios";
import OrdersTable from "./OrdersTable";

const Listing = () => {
  const [buyerOrder, setBuyerOrder] = useState([]);
  const [user, setUser] = useState("buyer");
  const [data, setData] = useState([]);
  const [orders, setOrders] = useState([]);
  const [numOfOrders, setNumOfOrders] = useState(0);

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

  // const buyers = 0;
  // for (let i=0;i<data.data.order.length;i++) {
  //   if data.data.order[i]._id = id
  // }

  // useEffect(() => {
  //   setData(seedData);
  //   setOrders(seedOrders);
  //   setNumOfOrders(
  //     Math?.round(
  //       (orders?.map((a) => a?.qty_reserved)?.reduce((a, b) => a + b, 0) /
  //         parseInt(data[0]?.max_quantity)) *
  //         100
  //     )
  //   );
  // }, [data, orders]);

  const timeRemaining = differenceInDays(
    new Date(data?.listing?.closing_date),
    new Date()
  );

  return (
    <div style={{ width: "80%", maxWidth: "1400px", margin: "0 auto" }}>
      <h1>{data?.listing?.name}</h1>
      <h4>{data?.listing?.description}</h4>
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
            src={data?.listing?.img}
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
            units reserved out of a target of {data?.listing?.max_quantity}{" "}
            units
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
          <Link
            to={`/order/${id}`}
            style={{
              textDecoration: "none",
              width: "100%",
            }}
          >
            {user === "buyer" && buyerOrder.length === 0 ? (
              <Button
                type="submit"
                variant="contained"
                size="large"
                style={{ minWidth: "100%" }}
              >
                Support this groupbuy
              </Button>
            ) : null}
          </Link>
        </div>
      </div>
      {user === "seller" && data?.order?.length > 0 ? (
        <div>
          <h1>All Orders</h1>
          <OrdersTable ordersData={data.order} />
        </div>
      ) : user === "buyer" && buyerOrder.length > 0 ? (
        <h1>Your Order</h1>
      ) : null}
    </div>
  );
};

export default Listing;
