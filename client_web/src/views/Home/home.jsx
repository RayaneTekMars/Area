import React, { useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Grid,
  Button,
  CardActionArea,
  Card,
  TextField,
} from "@mui/material";
import { ReactComponent as Logo } from "../../components/logo.svg";
import { ReactComponent as Text } from "../../components/text3.svg";
import CardArea from "../../components/card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  height: 510,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "28px",
  display: "flex",
  flexWrap: "wrap",
  backgroundColor: "#222222",
};

export default function HomePage() {
  const [open, setOpen] = React.useState(false);
  const handleOpenNewScenario = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let areas = [
    ["Area 1", "Description Area 1", "#EBBF16"],
    ["Area 2", "Description Area 2", "#EB1815"],
    ["Area 3", "Description Area 3", "#15EBAF"],
    ["Area 3", "Description Area 3", "#15EBAF"],
    ["Area 3", "Description Area 3", "#15EBAF"],
    ["Area 3", "Description Area 3", "#15EBAF"],
    ["Area 4", "Description Area 4", "#ED28BD"],
  ];
  let services = [
    ["Twitter", "#00acee"],
    ["Youtube", "#c4302b"],
  ];

  let actions = [
    ["Action 1", "Description Action 1", "#EBBF16"],
    ["Action 2", "Description Action 2", "#EB1815"],
    ["Action 3", "Description Action 3", "#15EBAF"],
  ];

  let reaction = [
    ["Reaction 1", "Description Reaction 1", "#EBBF16"],
    ["Reaction 2", "Description Reaction 2", "#EB1815"],
    ["Reaction 3", "Description Reaction 3", "#15EBAF"],
  ];

  useEffect(() => {
    document.body.style.backgroundColor = "#222222";
  }, []);
  return (
    <div>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Box
              sx={{
                position: "absolute",
                top: "20%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 800,
                height: 100,
                bgcolor: "background.paper",
                border: "2px solid #000",
                boxShadow: 24,
                p: 4,
                backgroundColor: "white",
                display: "flex",
                flexWrap: "wrap",
                borderRadius: "28px",
              }}
            >
              <div>
                <TextField
                  style={{ width: "80%", height: "10%", marginBottom: "2%" }}
                  label="Nom"
                  variant="standard"
                />
              </div>
              <div
                style={{ display: "flex", flexWrap: "wrap", marginTop: "4%" }}
              >
                {services.map((items, index) => {
                  return (
                    <CardArea
                      name={items[0]}
                      description={""}
                      color={items[1]}
                      maxW={200}
                      maxH={60}
                    />
                  );
                })}
              </div>
            </Box>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 800,
                height: 100,
                bgcolor: "background.paper",
                border: "2px solid #000",
                boxShadow: 24,
                p: 4,
                backgroundColor: "white",
                display: "flex",
                flexWrap: "wrap",
                borderRadius: "28px",
              }}
            >
              <div
                style={{ display: "flex", flexWrap: "wrap", marginTop: "4%" }}
              >
                {actions.map((items, index) => {
                  return (
                    <CardArea
                      name={items[0]}
                      description={""}
                      color={items[2]}
                      maxW={200}
                      maxH={60}
                    />
                  );
                })}
              </div>
            </Box>

            <Box
              sx={{
                position: "absolute",
                top: "80%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 800,
                height: 100,
                bgcolor: "background.paper",
                border: "2px solid #000",
                boxShadow: 24,
                p: 4,
                backgroundColor: "white",
                display: "flex",
                flexWrap: "wrap",
                borderRadius: "28px",
              }}
            >
              <div
                style={{ display: "flex", flexWrap: "wrap", marginTop: "4%" }}
              >
                {reaction.map((items, index) => {
                  return (
                    <CardArea
                      name={items[0]}
                      description={""}
                      color={items[2]}
                    />
                  );
                })}
                <CardArea
                  name={"Créer Scénario"}
                  description={""}
                  maxHeight={60}
                />
              </div>
            </Box>
          </Box>
        </Modal>
      </div>
      <AppBar position="static" style={{ backgroundColor: "#222222" }}>
        <Toolbar>
          <Logo />
          <div style={{ fontFamily: "Solid" }}>
            <Text />
          </div>
          <Link
            to="/profile"
            style={{
              marginLeft: "80%",
            }}
          >
            <Button
              style={{
                color: "black",
                borderRadius: "50px",
                backgroundColor: "white",
                width: "20px",
              }}
              startIcon={<AccountCircleIcon />}
            ></Button>
          </Link>

          <Grid container justify="flex-end"></Grid>
        </Toolbar>
      </AppBar>

      <div
        style={{
          fontFamily: "Inter",
          color: "white",
          fontSize: "3rem",
          width: "20%",
          margin: "0 auto",
          marginTop: "5%",
          marginTop: "2%",
        }}
      >
        Bonjour {localStorage.getItem("username")},
      </div>
      <div
        style={{
          fontFamily: "Inter",
          color: "white",
          fontSize: "3rem",
          width: "40%",
          margin: "0 auto",
          marginTop: "2%",
        }}
      >
        Commencez à automatiser vos
        tâches
      </div>
      <div
        style={{
          fontFamily: "Inter",
          color: "white",
          fontSize: "2rem",
          marginLeft: "42%",
          marginTop: "2%",
        }}
      >
        Vos scénarios
      </div>
      <div style={{ marginLeft: "28%", marginTop: "2%", maxWidth: "50%" }}>
        <div style={{ display: "flex", flexWrap: "wrap", marginTop: "2%" }}>
          {areas.map((items, index) => {
            return (
              <CardArea
                name={items[0]}
                description={items[1]}
                color={items[2]}
                maxW={200}
                minW={200}
                maxH={200}
                minH={200}
              />
            );
          })}
          <Card
            sx={{ maxWidth: 140, maxHeight: 100 }}
            style={{ backgroundColor: "white" }}
          >
            <CardActionArea onClick={handleOpenNewScenario}>
              <CardContent>
                <Typography component="div">
                  Créer un nouveau scénario
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
      </div>
    </div>
  );
}
