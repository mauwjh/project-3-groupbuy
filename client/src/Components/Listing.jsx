import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import ProgressBar from "./ProgressBar";
import { Grid } from "@mui/material";
import { differenceInDays } from "date-fns";
import { Button } from "@mui/material";
import axios from "axios";
import OrdersTable from "./OrdersTable";
import AuthApi from "../Utility/AuthApi";
import Typography from "@mui/material/Typography";

const Listing = () => {
  const [update, setUpdate] = useState(true)
  const [listing, setListing] = useState()
  const [data, setData] = useState([]);
  const [orders, setOrders] = useState([]);
  const [numOfOrders, setNumOfOrders] = useState(0);
  const [percOfGoal, setPercOfGoal] = useState(0);
  const [buyerOrders, setBuyerOrders] = useState()
  const session = useContext(AuthApi);

  const deleteOrder = async (id) => {
    const url = `/api/orders/${id}`;
    const deleteOrder = await axios.delete(url);
    console.log(deleteOrder);
    setUpdate(!update)
    setBuyerOrders([])
  };

  const { id } = useParams();
  console.log("HELLO ID", id);

  useEffect(() => {
    const fetchListing = async (id) => {
      console.log("id", id);
      const url = `/api/listings/${id}`;
      const data = await axios.get(url);
      console.log("DD", data.data);
      console.log("Orders", data.data.order.length);
      setListing(data.data.listing)
      setData(data.data);
      // <<<<<<< darr-listing
      //       setOrders(data.data.order)
      //       let totalOrders = 0
      //       for (let i=0;i<(data.data.order).length;i++){
      //         totalOrders+=data.data.order[i].qty_reserved
      //       }
      //       setNumOfOrders(totalOrders)
      // =======
      setOrders(data.data.order);
      setNumOfOrders(
        data.data.order.map((a) => a.qty_reserved).reduce((a, b) => a + b, 0)
      );
      setPercOfGoal(
        (data.data.order.map((a) => a.qty_reserved).reduce((a, b) => a + b, 0) /
          parseInt(data.data.listing.max_quantity)) *
          100
      );
      setBuyerOrders(data.data.order.filter(
        (a) => a.buyer_id[0]._id === session.auth.userInfo._id
      ))
    };
    fetchListing(id);
  }, [id, session, update]);

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
    new Date(data?.listing?.closing_date).setHours(0,0,0,0),
    new Date().setHours(0,0,0,0)
  );

  return (
    <Typography>
      <div style={{ width: "80%", maxWidth: "1400px", margin: "0 auto" }}>
        <h1 style={{ marginBottom: 0, marginTop: 60 }}>
          {data?.listing?.name}
        </h1>
        <h4 style={{ marginBottom: 60, marginTop: 10 }}>
          {data?.listing?.description}
        </h4>
        <div
          className="details-container"
          style={{ display: "flex", flexFlow: "row wrap" }}
        >
          <div
            className="image"
            style={{
              width: "65%",
              height: "450px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
            }}
          >
            <img
              src={data?.listing?.img}
              style={{ minHeight: "100%", minWidth: '100%' }}
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
                <ProgressBar data={percOfGoal} />
              </Grid>
            </Grid>
            <p
              style={{  
                fontSize: "30px",
                fontWeight: "bold",
                marginTop: "15px",
              }}
            >
              {numOfOrders}
            </p>
            <p style={{ marginTop: "-35px" }}>
              reserved out of a target of {data?.listing?.max_quantity} units
            </p>
            <p
              style={{
                fontSize: "30px",
                fontWeight: "bold",
                marginTop: "5px",
              }}
            >
              {orders?.length}
            </p>
            {orders?.length === 1 ? (
              <p style={{ marginTop: "-35px" }}>
                buyer has participated in this groupbuy
              </p>
            ) : (
              <p style={{ marginTop: "-35px" }}>
                buyers have participated in this groupbuy
              </p>
            )}

            <p
              style={{
                fontSize: "30px",
                fontWeight: "bold",
                marginTop: "5px",
              }}
            >
              ${listing?.price_per_unit}
            </p>
            <p style={{ marginTop: "-35px" }}>
                per unit
              </p>
            <p
              style={{
                fontSize: "30px",
                fontWeight: "bold",
                marginTop: "5px",
              }}
            >
              {timeRemaining >= 0 ? timeRemaining : 0}
            </p>
            {timeRemaining === 1 ? (
              <p style={{ marginTop: "-35px", marginBottom: "65px" }}>
                day remaining
              </p>
            ) : (
              <p style={{ marginTop: "-35px", marginBottom: "65px" }}>
                days remaining
              </p>
            )}

            {session?.auth?.userInfo?.usertype === "buyer" &&
            buyerOrders?.length === 0 &&
            timeRemaining >= 0 ? (
              <Link
                to={`/order/${id}`}
                style={{
                  textDecoration: "none",
                  width: "100%",
                }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  style={{ minWidth: "100%", marginTop: "-35px" }}
                >
                  Support this groupbuy
                </Button>
              </Link>
            )  : session?.auth?.userInfo?.usertype === "buyer" &&
              buyerOrders?.length > 0 ? (
              <p style={{ minWidth: "100%", marginTop: "-35px" }}>
                You have already supported this groupbuy
              </p>
            ) : timeRemaining < 0 ? (
              <p style={{ minWidth: "100%", marginTop: "-35px" }}>
                This groupbuy has ended
              </p>
            ) : percOfGoal >= 100 && timeRemaining >=0 ? (
              <p style={{ minWidth: "100%", marginTop: "-35px" }}>
                This groupbuy is no longer accepting orders
              </p>
            ) : session?.auth?.session === false && timeRemaining >= 0 ? (
              <Link
                to="/login"
                style={{ textDecoration: "none", width: "100%" }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  style={{ minWidth: "100%", marginTop: "-35px" }}
                >
                  Support this groupbuy
                </Button>
              </Link>
            ) :  null}
          </div>
        </div>
        {session?.auth?.userInfo?.usertype === "seller" &&
        data?.order?.length > 0 &&
        data?.listing?.seller_id[0] === session?.auth?.userInfo?._id ? (
          <div>
            <h1>All Orders</h1>
            <OrdersTable ordersData={data?.order} />
          </div>
        ) : null}

        {session?.auth?.userInfo?.usertype === "buyer" &&
        buyerOrders?.length > 0 ? (
          <div>
            <h2>Your Order</h2>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexFlow: "row-wrap",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button variant="contained" component={Link} to={`/order/${id}`}>Update</Button>
              <Button
                variant="contained"
                onClick={() =>
                  deleteOrder(
                    data?.order?.filter(
                      (a) => a.buyer_id[0]._id === session?.auth?.userInfo?._id
                    )[0]._id
                  )
                }
              >
                Delete
              </Button>
            </div>
            <OrdersTable
              ordersData={[
                data?.order?.filter(
                  (a) => a.buyer_id[0]._id === session?.auth?.userInfo?._id
                )[0],
              ]}
            />
          </div>
        ) : null}
      </div>
    </Typography>
  );
};

export default Listing;
