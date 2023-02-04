import React, { useEffect } from "react";
import MainNavbar from "../../../components/mainNavbar";
import SpotifyLogo from "../../../assets/logo_spotify.png";
import "../../../styles/spotify.css";
import { Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

export default function SpotifyPage() {
  let actions = [
    "Play a song",
    "Play a playlist",
    "Play a podcast",
    "List a song",
  ];
  let reactions = [
    "Play a song",
    "Play a playlist",
    "Play a podcast",
    "List a song",
  ];
  useEffect(() => {
    document.body.style.backgroundColor = "#1ED760";
  }, []);
  return (
    <div>
      <MainNavbar />
      <div className="divSpotifyLogo">
        <img src={SpotifyLogo} alt="Spotify Logo" />
      </div>
      <div className="divSpotifyTitle">
        <h1>Spotify</h1>
      </div>
      <div className="divSpotifyDescription">
        <p>
          Spotify is a digital music, podcast and video service that gives you
          instant access to millions of songs and other content from creators
          around the world.
        </p>
      </div>
      <div className="divSpotifyConnectionButton">
        <Button style={{ color: "black" }}>Déconnexion</Button>
      </div>
      <div className="divSpotifyActionText">
        <h2>Actions </h2>
      </div>
      <div className="divSpotifyActionCards">
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
      <div className="divSpotifyActionText">
        <h2>Reactions </h2>
      </div>
      <div className="divSpotifyReactionCards">
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
