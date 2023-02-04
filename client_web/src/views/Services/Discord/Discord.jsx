import React, { useEffect } from "react";
import MainNavbar from "../../../components/mainNavbar";
import DiscordLogo from "../../../assets/logo_discord.png";
import "../../../styles/discord.css";
import { Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

export default function DiscordPage() {
  let actions = [
    "Send a message",
    "Send a file",
    "Send a voice message",
    "Send a video",
  ];
  let reactions = [
    "Send a message",
    "Send a file",
    "Send a voice message",
    "Send a video",
  ];
  useEffect(() => {
    document.body.style.backgroundColor = "#5865F2";
  }, []);
  return (
    <div>
      <MainNavbar />
      <div className="divDiscordLogo">
        <img src={DiscordLogo} alt="Discord Logo" />
      </div>
      <div className="divDiscordTitle">
        <h1>Discord</h1>
      </div>
      <div className="divDiscordDescription">
        <p>
        Discord is a free application for mobile and PC. It allows you to chat by text, voice or video in real time.
        </p>
      </div>
      <div className="divDiscordConnectionButton">
        <Button style={{ color: "black" }}>Déconnexion</Button>
      </div>
      <div className="divDiscordActionText">
        <h2>Actions </h2>
      </div>
      <div className="divDiscordActionCards">
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
      <div className="divDiscordActionText">
        <h2>Reactions </h2>
      </div>
      <div className="divDiscordReactionCards">
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
