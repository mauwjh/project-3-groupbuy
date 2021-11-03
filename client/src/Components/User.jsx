import React, { useState, useEffect, useContext } from "react";
import {useParams} from 'react-router'
import { Link } from "react-router-dom";
import GroupbuyDetails from "./GroupbuyDetails";
import AuthApi from "../Utility/AuthApi";
import Typography from "@mui/material/Typography";

const User = () => {
  const session = useContext(AuthApi);
  const [allListings, setAllListings] = useState([]);
  const [orders, setOrders] = useState([])
  const {id} = useParams()

  useEffect(() => {
    const fetchData = async () => {
      const URL = `/api/listings/user/${id}`;
      const res = await fetch(URL);
      console.log(res);
      const data = await res.json();
      console.log("hello");
      console.log(data);
      setAllListings(data.listing);
      setOrders(data.order)
    };
    fetchData();
  }, [session, id]);

  return (
    <Typography>
      <>
        <div>
          <h1>Welcome, {session.auth.userInfo.username}</h1>
        </div>
        <div className="seller-account">
          <div
            style={{ borderBottom: "1px solid #CDCDCD", marginBottom: "40px" }}
          >
            <h2>Summary of Your Listings</h2>
          </div>
          <div
            style={{
              display: "flex",
              flexFlow: "row wrap",
              width: "80%",
              maxWidth: "1400px",
              margin: "0 auto",
              alignItems: "center",
              justifyContent: "left",
            }}
          >
            {allListings?.map((a) => {
              return (
                <Link
                  to={`/listing/${a._id}`}
                  style={{
                    width: "30%",
                    margin: "20px",
                    textDecoration: "none",
                    color: "black",
                  }}
                >
                  <GroupbuyDetails
                    data={a}
                    orders={orders.filter((b) => b.listing_id[0]._id === a._id)}
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </>
    </Typography>
  );
};

export default User;
