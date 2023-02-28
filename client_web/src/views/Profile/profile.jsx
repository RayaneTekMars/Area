import React, { useEffect } from "react";
import { Button } from "@mui/material";
import CardAreaConnect from "../../components/cardConnect";
import TwitterButton from "../../components/twitterButton";
import GithubButton from "../../components/githubButton";
import DiscordButton from "../../components/discordButton";
import MainNavbar from "../../components/mainNavbar";
import SpotifyButton from "../../components/spotifyButton";
import TwitchButton from "../../components/twitchButton";

function disconnect() {
  localStorage.removeItem("username");
  localStorage.removeItem("token");
  window.location.href = "/";
}

export default function HomePage() {
  const [username, setUsername] = React.useState("");

  useEffect(() => {
    fetch("https://api.automateme.fr/me", {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUsername(data.data.username);
      });
  }, []);

  let services = [
    ["Twitter", "#00acee"],
  ];
  useEffect(() => {
    document.body.style.backgroundColor = "#222222";
  }, []);
  return (
    <div>
      <MainNavbar />
      <div
        style={{
          fontFamily: 'Inter-ExtraBold',
          color: "white",
          fontSize: "2rem",
          width: "40%",
          margin: "0 auto",
          marginTop: "5%",
        }}
      >
        Bienvenue sur ton profil {username}
      </div>
      <div
        style={{
          fontFamily: 'Inter-ExtraBold',
          color: "white",
          fontSize: "1rem",
          marginLeft: "28%",
          marginTop: "4%",
        }}
      >
        Services
      </div>
      <div style={{ marginLeft: "28%", marginTop: "2%", maxWidth: "50%" }}>
        <div style={{ display: "flex", flexWrap: "wrap", marginTop: "2%" }}>
          {services.map((items, index) => {
            return (
              <CardAreaConnect
                name={items[0]}
                color={items[1]}
                maxW={200}
                minW={200}
                maxH={200}
                minH={200}
              />
            );
          })}
        </div>
      </div>
      <TwitterButton />
      <GithubButton />
      <DiscordButton />
      <SpotifyButton />
      <TwitchButton />
      <Button
        style={{
          backgroundColor: "white",
          color: "black",
          borderRadius: "50px",
          marginTop: "10%",
          marginLeft: "45%",
          fontFamily: 'Inter-ExtraBold',
        }}
        onClick={disconnect}
      >
        Déconnexion
      </Button>
    </div>
  );
}
