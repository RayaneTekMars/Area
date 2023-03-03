import React, { useEffect } from "react";
import MainNavbar from "../../../components/mainNavbar";
import SpotifyLogo from "../../../assets/logo_spotify.png";
import "../../../styles/spotify.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import SpotifyButton from "../../../components/spotifyButton";
import Tooltip from '@mui/material/Tooltip';

export default function SpotifyPage() {
  let actions = [
    "MusicChange",
  ];
  let reactions = [
    "Reaction 1",
  ];

  let descriptionActions = [
    "Trigger when the music is changed",
  ];
  let descriptionReactions = [
    "Description reaction 1",
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
        <SpotifyButton />
      </div>
      <div className="divSpotifyActionText">
        <h2>Actions </h2>
      </div>
      <div className="divSpotifyActionCards">
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
      <div className="divSpotifyActionText">
        <h2>Reactions </h2>
      </div>
      <div className="divSpotifyReactionCards">
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
