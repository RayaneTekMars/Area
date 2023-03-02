import React, { useEffect } from "react";
import MainNavbar from "../../../components/mainNavbar";
import TwitterLogo from "../../../assets/logo_twitter.png";
import "../../../styles/twitter.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TwitterButton from "../../../components/twitterButton";
import Tooltip from '@mui/material/Tooltip';


export default function TwitterPage() {
  let actions = [
    "NewFollower",
    "NewDirectMessage",
  ];
  let reactions = [
    "PostTweet",
    "CreateDirectMessage",
  ];

  let descriptionActions = [
    "Trigger when a new person follows you on Twitter",
    "Trigger when a new direct message is received",
  ];
  let descriptionReactions = [
    "Post a tweet on your Twitter account",
    "Create a direct message from your Twitter account to another user",
  ];

  useEffect(() => {
    document.body.style.backgroundColor = "#1DA1F2";
  }, []);
  return (
    <div>
      <MainNavbar />
      <div className="divTwitterLogo">
        <img src={TwitterLogo} alt="Twitter Logo" />
      </div>
      <div className="divTwitterTitle">
        <h1>Twitter</h1>
      </div>
      <div className="divTwitterDescription">
        <p>
          Twitter is a microblogging social network operated by Twitter Inc.
        </p>
      </div>
      <div>
      <TwitterButton />
      </div>
      <div className="divTwitterActionText">
        <h2>Actions </h2>
      </div>
      <div className="divTwitterActionCards">
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
      <div className="divTwitterActionText">
        <h2>Reactions </h2>
      </div>
      <div className="divTwitterReactionCards">
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
