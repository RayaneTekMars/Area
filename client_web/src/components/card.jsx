import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "../styles/style.css";
import YoutubeLogo from "../assets/logo_youtube.png";
import TwitterLogo from "../assets/logo_twitter.jpeg";
import {Button, CardMedia } from "@material-ui/core";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";

function deleteArea(id) {
  const API_URL = 'http://localhost:8080/scenarios/delete/';
  
  fetch(`${API_URL}${id}`, {
    method: "DELETE",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("jwt"),
    },
  })
  .then((response) => {
    if (response.ok) {
      window.location.reload();
    } else {
      throw new Error('An error occurred while deleting the area.');
    }
  })
  .catch((error) => {
    console.error(error);
  });
}

export default function CardArea(props) {
  return (
    <Card
      sx={{
        minHeight: 200,
        minWidth: 200,
      }}
      style={{ backgroundColor: "white" }}
    >
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          style={{ fontFamily: "Inter-ExtraBold", textAlign: "center" }}
        >
          {props.name}
        </Typography>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: "15%",
          }}
        >
          <CardMedia
            component="img"
            image={TwitterLogo}
            title="green iguana"
            style={{ width: 50, height: 50, marginRight: "10px" }}
          />
          <ArrowCircleRightIcon
            style={{ marginRight: "10px", marginTop: "8%" }}
          />
          <CardMedia
            component="img"
            image={YoutubeLogo}
            title="green iguana"
            style={{ width: 50, height: 50, marginRight: "10px" }}
          />
        </div>
      </CardContent>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: "5%",
        }}
      >
        <Button style={{ fontFamily: "Inter-ExtraBold", textAlign: "center" }} onClick={() => deleteArea(props.id)}>
          Delete
        </Button>
      </div>
    </Card>
  );
}
