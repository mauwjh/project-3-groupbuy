import React from "react";
import { Button } from "@mui/material";
import ProgressBar from "./ProgressBar";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";

const GroupbuyDetails = ({ data, orders, user }) => {
  return (
    <Typography>
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
        <h3>{data.name}</h3>
        <h5>{data.description}</h5>
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
            orders?.map((a) => a?.qty_reserved)?.reduce((a, b) => a + b, 0)
          )}{" "}
          orders out of a {data.max_quantity} order target
        </p>
        <p>
          Closing Date: {new Date(data.closing_date).toString().slice(4, 15)}
        </p>
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderBottom: "1px solid #CDCDCD",
          borderRight: "1px solid #CDCDCD",
          borderLeft: "1px solid #CDCDCD",
          boxSizing: "border-box",
        }}
      >
        {user === 'seller' ?  <Button
          component={Link}
          type="submit"
          variant="contained"
          fullWidth
          sx={{margin: "10px"}}
          to={`/listing/${data._id}/edit`}
        >
          Update Listing
        </Button> : null}
       
      </div>
    </div>
    </Typography>
  );
};

export default GroupbuyDetails;
