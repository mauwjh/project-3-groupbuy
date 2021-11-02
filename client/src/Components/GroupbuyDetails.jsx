import React from "react";
import ProgressBar from "./ProgressBar";
import { Grid } from "@mui/material";

const GroupbuyDetails = ({ data, orders }) => {
  return (
    <div>
      <div
        className="image"
        style={{
          width: "100%",
          height: "200px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          borderTop: "1px solid #CDCDCD",
          borderRight: "1px solid #CDCDCD",
          borderLeft: "1px solid #CDCDCD",
          boxSizing: "border-box",
        }}
      >
        <img
          src={data.img}
          style={{ minHeight: "100%", minWidth: "100%" }}
          alt="transparent"
        />
      </div>
      <div
        style={{
          border: "1px solid #CDCDCD",
          textAlign: "left",
          padding: "15px",
          minHeight: "150px",
        }}
      >
        <h4>{data.name}</h4>
        <h6>{data.description}</h6>
      </div>
      <div
        style={{
          borderBottom: "1px solid #CDCDCD",
          borderRight: "1px solid #CDCDCD",
          borderLeft: "1px solid #CDCDCD",
          textAlign: "left",
          padding: "15px",
        }}
      >
        <Grid spacing={1} container>
          <Grid xs item>
            <ProgressBar
              data={Math?.round(
                (orders
                  ?.map((a) => a?.qty_reserved)
                  ?.reduce((a, b) => a + b, 0) /
                  parseInt(data?.max_quantity)) *
                  100
              )}
            />
          </Grid>
        </Grid>
        <p>
          {Math?.round(
            (orders?.map((a) => a?.qty_reserved)?.reduce((a, b) => a + b, 0) /
              parseInt(data?.max_quantity)) *
              100
          )}{" "}
          orders out of a {data.max_quantity} order target
        </p>
        <p>Closing Date: {data.closing_date.slice(4,15)}</p>
      </div>
    </div>
  );
};

export default GroupbuyDetails;
