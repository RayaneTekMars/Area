import React, { useEffect } from "react";
import MainNavbar from "../../../components/mainNavbar";
import TwitchLogo from "../../../assets/logo_twitch.png";
import "../../../styles/twitch.css";
import { Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

export default function TwitchPage() {
  let actions = [
    "Start a stream",
    "Stop a stream",
    "New follower",
    "New subscriber",
  ];
  let reactions = [
    "Start a stream",
    "Stop a stream",
    "New follower",
    "New subscriber",
  ];
  useEffect(() => {
    document.body.style.backgroundColor = "#9146FF";
  }, []);
  return (
    <div>
      <MainNavbar />
      <div className="divTwitchLogo">
        <img src={TwitchLogo} alt="Twitch Logo" />
      </div>
      <div className="divTwitchTitle">
        <h1>Twitch</h1>
      </div>
      <div className="divTwitchDescription">
        <p>
        Twitch is a live video streaming and VAD service launched in June 2011
        </p>
      </div>
      <div className="divTwitchConnectionButton">
        <Button style={{ color: "black" }}>Déconnexion</Button>
      </div>
      <div className="divTwitchActionText">
        <h2>Actions </h2>
      </div>
      <div className="divTwitchActionCards">
        {actions.map((action, index) => (
          <Card sx={{ width: 180, marginLeft: "1%", height: 180 }}>
            <CardContent
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "80%",
              }}
            >
              <h1 style={{ textAlign: "center" }}>{action}</h1>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="divTwitchActionText">
        <h2>Reactions </h2>
      </div>
      <div className="divTwitchReactionCards">
        {reactions.map((reaction, index) => (
          <Card sx={{ width: 180, marginLeft: "1%", height: 180}}>
            <CardContent
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "80%",
              }}
            >
              <h1 style={{ textAlign: "center" }}>{reaction}</h1>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
