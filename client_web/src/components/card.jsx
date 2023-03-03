import * as React from "react";
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "../styles/style.css";
import SpotifyLogo from "../assets/logo_spotify.png";
import TwitterLogo from "../assets/logo_twitter.png";
import DiscordLogo from "../assets/logo_discord.png";
import TwitchLogo from "../assets/logo_twitch.png";
import GithubLogo from "../assets/logo_github.png";
import { Button, CardMedia } from "@material-ui/core";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";

function deleteArea(id) {
  const API_URL = "http://localhost:8080/scenarios/delete/";

  fetch(`${API_URL}${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
  })
    .then((response) => {
      if (response.ok) {
        window.location.reload();
      } else {
        throw new Error("An error occurred while deleting the area.");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

export default function CardArea(props) {
  let pictureArray = [
    ["Twitter", TwitterLogo],
    ["Spotify", SpotifyLogo],
    ["Discord", DiscordLogo],
    ["Twitch", TwitchLogo],
    ["Github", GithubLogo],
  ];
  let colorArray = [
    ["Twitter", "#1DA1F2"],
    ["Spotify", "#1ED760"],
    ["Discord", "#5865F2"],
    ["Twitch", "#9146FF"],
    ["Github", "#000000"],
  ];
  const [actionLogo, setActionLogo] = useState(null);
  const [reactionLogo, setReactionLogo] = useState(null);

  useEffect(() => {
    const [, actionImage] =
      pictureArray.find(([key]) => key === props.actionService) || [];
    setActionLogo(actionImage);
  }, [props.actionService]);

  useEffect(() => {
    const [, reactionImage] =
      pictureArray.find(([key]) => key === props.reactionService) || [];
    setReactionLogo(reactionImage);
  }, [props.reactionService]);
  const [actionColor, setActionColor] = useState(null);
  const [reactionColor, setReactionColor] = useState(null);

  useEffect(() => {
    const [, actionColorValue] = colorArray.find(
      ([key]) => key === props.actionService
    ) || [];
    setActionColor(actionColorValue);
  }, [props.actionService]);

  useEffect(() => {
    const [, reactionColorValue] = colorArray.find(
      ([key]) => key === props.reactionService
    ) || [];
    setReactionColor(reactionColorValue);
  }, [props.reactionService]);

  const backgroundStyle = actionColor && reactionColor
    ? {
        background: `linear-gradient(to right, ${actionColor} 50%, ${reactionColor} 50%)`
      }
    : {};

  return (
    <Card
      sx={{
        minHeight: 200,
        minWidth: 200,
        ...backgroundStyle,
      }}
      style={{ backgroundColor: "white" }}
    >
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          style={{
            fontFamily: "Inter-ExtraBold",
            textAlign: "center",
            color: "white",
          }}
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
            image={actionLogo}
            title={props.actionService}
            style={{ width: 60, height: 50, marginRight: "10px" }}
          />
          <ArrowCircleRightIcon
            style={{ marginRight: "10px", marginTop: "8%", color: "white" }}
          />
          <CardMedia
            component="img"
            image={reactionLogo}
            title={props.reactionService}
            style={{ width: 60, height: 50, marginRight: "10px" }}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            marginTop: "15%",
            color: "white",
          }}
        >
          {props.actionName}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            marginTop: "2%",
            color: "white",
          }}
        >
          {props.reactionName}
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
        <Button
          style={{ fontFamily: "Inter-ExtraBold", textAlign: "center", color: "red" }}
          onClick={() => deleteArea(props.id)}
        >
          Delete
        </Button>
      </div>
    </Card>
  );
}
