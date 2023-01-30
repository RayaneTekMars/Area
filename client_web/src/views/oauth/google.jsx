import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function GooglePage() {
  const location = useLocation();
  const [code, setCode] = useState("");
  const [response, setResponse] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const queryCode = params.get("code");

    if (!queryCode) return;

    setCode(queryCode);

    console.log(queryCode);

    // const headers = new Headers();
    // headers.append("Accept", "application/json");
    // headers.append("Content-Type", "application/json");

    // const requestOptions = {
    //   method: "POST",
    //   headers,
    //   body: JSON.stringify({
    //     code: queryCode,
    //     authTokenName: "google"
    //   }),
    // };

    // fetch("http://localhost:8080/auth/login/google/code", requestOptions)
    //   .then((res) => res.json())
    //   .then((res) => {
    //     localStorage.setItem("jwt", res.data.data.bearerToken);
    //     console.log(res.data);
    //     window.location.href = "/home";
    //   });
  }, [location]);

  return (
      <head>
        <title>AREA</title>
        <meta name="description" content="AREA" />
        <link rel="icon" href="/favicon.ico" />
      </head>
  );
}

export default GooglePage;
