import React, { useEffect } from "react";
import MainNavbar from "../../../components/mainNavbar";
import TwitterLogo from "../../../assets/logo_twitter.png";
import "../../../styles/twitter.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TwitterButton from "../../../components/twitterButton";

export default function TwitterPage() {
  let actions = [
    "Post a tweet",
    "follow",
    "retweet",
    "Like",
  ];
  let reactions = [
    "Post a tweet",
    "follow",
    "retweet",
    "Like",
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
          Twitter is a digital music, podcast and video service that gives you
          instant access to millions of songs and other content from creators
          around the world.
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
      <div className="divTwitterActionText">
        <h2>Reactions </h2>
      </div>
      <div className="divTwitterReactionCards">
        {reactions.map((reaction, index) => (
          <Card sx={{ width: 180, marginLeft: "1%", height: 180, borderRadius: "20px"}}>
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
