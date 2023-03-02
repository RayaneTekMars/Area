import React, { useEffect } from "react";
import MainNavbar from "../../../components/mainNavbar";
import TwitchLogo from "../../../assets/logo_twitch.png";
import "../../../styles/twitch.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TwitchButton from "../../../components/twitchButton";
import Tooltip from '@mui/material/Tooltip';

export default function TwitchPage() {
  let actions = [
    "Action 1",
    "Action 2",
  ];
  let reactions = [
    "Reaction 1",
    "Reaction 2",
  ];

  let descriptionActions = [
    "Description action 1",
    "Description action 2",
  ];
  let descriptionReactions = [
    "Description reaction 1",
    "Description reaction 2",
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
        <TwitchButton/>
      </div>
      <div className="divTwitchActionText">
        <h2>Actions </h2>
      </div>
      <div className="divTwitchActionCards">
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
      <div className="divTwitchActionText">
        <h2>Reactions </h2>
      </div>
      <div className="divTwitchReactionCards">
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
