import React, { useEffect } from "react";
import MainNavbar from "../../../components/mainNavbar";
import DiscordLogo from "../../../assets/logo_discord.png";
import "../../../styles/discord.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import DiscordButton from "../../../components/discordButton";
import Tooltip from '@mui/material/Tooltip';

export default function DiscordPage() {
  let actions = ["NewMessage"];
  let reactions = [
    "PostChannelMessage",
  ];

  let descriptionActions = ["Trigger when a new message is sent in a channel"];
  let descriptionReactions = [
    "Post a message to a channel",
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
        <DiscordButton />
      </div>
      <div className="divDiscordActionText">
        <h2>Actions </h2>
      </div>
      <div className="divDiscordActionCards">
        {actions.map((action, index) => (
          <Card sx={{ width: 180, marginLeft: "1%", height: 180, borderRadius: "20px"}}>
          <Tooltip title={descriptionActions[index]}>
            <CardContent
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "80%",
              }}
            >
              <h1 style={{ textAlign: "center", fontSize: "14px" }}>{action}</h1>
            </CardContent>
          </Tooltip>
        </Card> 
        ))}
      </div>
      <div className="divDiscordActionText">
        <h2>Reactions </h2>
      </div>
      <div className="divDiscordReactionCards">
        {reactions.map((reaction, index) => (
          <Card sx={{ width: 180, marginLeft: "1%", height: 180, borderRadius: "20px"}}>
          <Tooltip title={descriptionReactions[index]}>
            <CardContent
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "80%",
              }}
            >
              <h1 style={{ textAlign: "center", fontSize: "14px" }}>{reaction}</h1>
            </CardContent>
          </Tooltip>
        </Card>
        ))}
      </div>
    </div>
  );
}
