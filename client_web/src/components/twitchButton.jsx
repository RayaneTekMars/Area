import React, { useEffect, useState } from "react";
import styles from "../styles/Oauth.module.css";

const TwitchButton = () => {
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

    fetch("http://localhost:8080/subscriptions/twitch", requestOptions)
      .then((res) => res.json())
      .then((res) => {
        setUrl(res.data.url);
      });
  }, []);

  return (
    <a href={url}>
      <button className={styles.button}>
        Signin with Twitch
      </button>
    </a>
  );
};

export default TwitchButton;
