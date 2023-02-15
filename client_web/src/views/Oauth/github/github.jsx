import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function GithubPage() {
  const location = useLocation();
  const [code, setCode] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    const params = new URLSearchParams(location.search);
    const queryCode = params.get("code");

    if (!queryCode) return;

    setCode(queryCode.toString());

    console.log(queryCode);

    const headers = new Headers();
    headers.append("Accept", "application/json");
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "POST",
      headers,
      body: JSON.stringify({
        code: queryCode,
      }),
    };

    fetch("http://localhost:8080/subscriptions/github", requestOptions)
      .then((res) => res.json())
      .then((res) => {
        console.log(res.data);
        window.location.href = "/home";
      });
  }, []);

  return (
    <head>
      <title>AREA</title>
      <meta name="description" content="AREA" />
      <link rel="icon" href="/favicon.ico" />
    </head>
  );
}

export default GithubPage;
