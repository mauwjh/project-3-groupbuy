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
  const [buyerListings, setBuyerListings] = useState([])
  const [buyerOrders, setBuyerOrders] = useState([])
  const {id} = useParams()

  useEffect(() => {
    const fetchSellerData = async () => {
      const URL = `/api/listings/seller/${id}`;
      const res = await fetch(URL);
      console.log(res);
      const data = await res.json();
      console.log("hello");
      console.log(data);
      setAllListings(data.listing);
      setOrders(data.order)
    };
    const fetchBuyerData = async () => {
      const URL = `/api/listings/buyer/${id}`;
      const res = await fetch(URL);
      console.log(res);
      const data = await res.json();
      console.log("hello");
      console.log(data);
      setBuyerListings(data.listing);
      setBuyerOrders(data.order)
    };
    fetchSellerData();
    fetchBuyerData()
  }, [session, id]);

  return (
    <Typography>
      {session?.auth?.userInfo?.usertype === 'seller' ? 
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
                    user={session?.auth?.userInfo?.usertype}
                    />
                </Link>
              );
            })}
          </div>
          </div>
        </>
         : <>
         <div>
             <h1>Welcome, {session.auth.userInfo.username}</h1>
           </div>
           <div className="buyer-account">
             <div
               style={{ borderBottom: "1px solid #CDCDCD", marginBottom: "40px" }}
             >
               <h2>Your Backed Groupbuys</h2>
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
               {buyerListings?.map((a) => {
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
                       orders={buyerOrders.filter((b) => b.listing_id[0]._id === a._id)}
                       user={session?.auth?.userInfo?.usertype}
                       />
                   </Link>
                 );
               })}
             </div>
             </div>
           </> }
        
    </Typography>
  );
};

export default User;
