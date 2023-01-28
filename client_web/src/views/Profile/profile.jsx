import React, { useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Grid,
  Button,
} from "@mui/material";
import { ReactComponent as Logo } from "../../components/logo.svg";
import { ReactComponent as Text } from "../../components/text3.svg";
import CardAreaConnect from "../../components/cardConnect";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";

export default function HomePage() {
  let services = [
    ["Twitter", "#00acee"],
    ["Youtube", "#c4302b"],
    ];
  useEffect(() => {
    document.body.style.backgroundColor = "#222222";
  }, []);
  return (
    <div>
      <AppBar position="static" style={{ backgroundColor: "#222222" }}>
        <Toolbar>
          <Logo />
          <div style={{ fontFamily: "Solid" }}>
            <Text />
          </div>
          <Link to="/profile" style={{
              marginLeft: "80%",
            }} >
          <Button
            style={{
              color: "black",
              borderRadius: "50px",
              backgroundColor: "white",
              width: "20px",
            }}
            startIcon={<AccountCircleIcon />}
          >
          </Button>
          </Link>

          <Grid container justify="flex-end"></Grid>
        </Toolbar>
      </AppBar>

      <div
        style={{
          fontFamily: "Inter",
          color: "white",
          fontSize: "3rem",
          marginLeft: "45%",
          marginTop: "5%",
        }}
      >
        Profil
      </div>
      <div></div>
      <div
        style={{
          fontFamily: "Inter",
          color: "white",
          fontSize: "2rem",
          marginLeft: "28%",
          marginTop: "2%",
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
    </div>
  );
}
