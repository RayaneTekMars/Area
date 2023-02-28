import React, { useEffect, useState } from "react";
import styles from "../styles/Oauth.module.css";

const SpotifyButton = () => {
  const [url, setUrl] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    const headers = new Headers();
    headers.append("Accept", "application/json");
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers,
    };

    fetch("https://api.automateme.fr/subscriptions/spotify", requestOptions)
      .then((res) => res.json())
      .then((res) => {
        setUrl(res.data.url);
      });
  }, []);

  return (
    <a href={url}>
      <button className={styles.button}>
        Signin with Spotify
      </button>
    </a>
  );
};

export default SpotifyButton;
