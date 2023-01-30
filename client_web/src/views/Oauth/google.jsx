import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function GooglePage() {
  const location = useLocation();
  const [code, setCode] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const queryCode = params.get("code");

    if (!queryCode) return;

    setCode(queryCode.toString());

    const headers = new Headers();
    headers.append("Accept", "application/json");
    headers.append("Content-Type", "application/json");

    const requestOptions = {
      method: "POST",
      headers,
      body: JSON.stringify({
        code: queryCode,
        authTokenName: "google"
      }),
    };

    fetch("http://localhost:8080/auth/login/google/code", requestOptions)
      .then((res) => res.json())
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("jwt", res.data.bearerToken);
        window.location.href = "/home";
      });
  }, [location.search]);

  return (
      <head>
        <title>AREA</title>
        <meta name="description" content="AREA" />
        <link rel="icon" href="/favicon.ico" />
      </head>
  );
}

export default GooglePage;