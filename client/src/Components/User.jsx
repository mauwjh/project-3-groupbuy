import React from "react";
import { Link } from "react-router-dom";
import Listings from "../Models/MultiListingSeed";
import Orders from "../Models/OrderSeed";
import GroupbuyDetails from "./GroupbuyDetails";

const User = () => {
  

  return (
    <>
      <div className='seller-account'>
        <div
          style={{ borderBottom: "1px solid #CDCDCD", marginBottom: "40px" }}
        >
          <h1>Summary of Listings</h1>
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
          {Listings.map((a) => {
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
                  orders={Orders.filter((b) => b._id === a._id)}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default User;
