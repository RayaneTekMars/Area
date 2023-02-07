import React from "react";
import { AppBar, Toolbar, Button } from "@material-ui/core";
import { ReactComponent as Logo } from "./logo.svg";
import { Grid } from "@material-ui/core";
import { ReactComponent as Text } from "./text3.svg";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const MainNavbar = () => {
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
