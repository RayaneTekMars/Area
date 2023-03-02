import React, { useEffect } from "react";
import { AppBar, Toolbar, Button } from "@material-ui/core";
import { ReactComponent as Logo } from "./logo.svg";
import { Grid } from "@material-ui/core";
import { ReactComponent as Text } from "./text3.svg";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const MainNavbar = () => {
  const [subscription, setSubscription] = React.useState();
  function isSubscribed() {
    fetch("http://localhost:8080/subscriptions", {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data.length === 0) setSubscription(0);
        else setSubscription(1);
      });
  }

  useEffect(() => {
    isSubscribed();
  }, [subscription]);

  return (
    <AppBar position="fixed" style={{ backgroundColor: "#222222" }}>
      <Toolbar>
        <Link to="/home" style={{ textDecoration: "none" }}>
          <Logo />
        </Link>
        <div style={{ fontFamily: "Solid" }}>
          <Text />
        </div>
        <Grid container justify="flex-end">
          <Link to="/scenario" style={{ textDecoration: "none" }}>
            <Button
              style={{
                color: "white",
                borderRadius: "50px",
                marginRight: "2%",
              }}
            >
              Scenarios
            </Button>
          </Link>
          {subscription === 1 ? (
            <Link
              to="/scenario/create"
              style={{ textDecoration: "none", marginRight: "1%" }}
            >
              <Button
                style={{
                  color: "black",
                  borderRadius: "50px",
                  backgroundColor: "white",
                }}
              >
                Créer
              </Button>
            </Link>
          ) : null}

          <Link to="/profile" style={{ textDecoration: "none" }}>
            <Button
              style={{
                color: "black",
                borderRadius: "50px",
                backgroundColor: "white",
              }}
              startIcon={<AccountCircleIcon />}
            >
              Profile
            </Button>
          </Link>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default MainNavbar;
