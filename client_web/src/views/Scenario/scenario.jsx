import React, { useEffect, useState } from "react";
import {
  Button,
  CardActionArea,
  Card,
  TextField,
} from "@mui/material";
import CardArea from "../../components/card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Fond1 from "../../assets/fond1.png";
import '../../styles/style.css';
import MainNavbar from "../../components/mainNavbar";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 510,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  backgroundColor: "white",
  borderRadius: "28px",
};

async function CreateScenario() {
  const data = {
    name: document.getElementById("scenarioname").value,
    trigger: {
      name: "NewFollower",
      serviceName: "Twitter",
      params: [],
    },
    reaction: {
      name: "PostTweet",
      serviceName: "Twitter",
      params: [
        {
          name: "text",
          value: document.getElementById("scenariotext").value,
          required: true,
        },
      ],
    },
  };
  fetch("https://api.automateme.fr/scenarios/create", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("jwt"),
    },
    body: JSON.stringify(data)
  })
    .then((res) => res.json())
    .then((data) => {
      window.location.reload();
    });
}

export default function ScenarioPage() {
  const [open, setOpen] = React.useState(false);
  const handleOpenNewScenario = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [scenario, setScenario] = React.useState("");
  const [action, setAction] = React.useState("");
  const [reaction, setReaction] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    // call /me to get user info
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

  useEffect(() => {
    fetch("https://api.automateme.fr/scenarios", {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        let areas = data.data.map(item => [item.account, item.id, item.name]);
        setAreas(areas);
      });
  }, []);

  const handleChangeScenario = (event) => {
    setScenario(event.target.value);
  };

  const handleChangeAction = (event) => {
    setAction(event.target.value);
  };

  const handleChangeReaction = (event) => {
    setReaction(event.target.value);
  };
  let services = [
    ["Twitter", "#00acee"],
  ];

  let actions = [
    ["Nouveau follower"],
  ];

  let reactions = [
    ["Tweet"],
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
            <img
              src={Fond1}
              style={{
                position: "absolute",
                right: "0px",
                top: "50%",
                transform: "translateY(-50%)",
              }}
              alt="fond"
            />
            <div
              style={{
                marginLeft: "10%",
                marginTop: "3%",
                fontFamily: "Inter",
                fontSize: "150%",
              }}
            >
              Nouveau Scénario
            </div>
            <div style={{ marginTop: "2%" }}>
              <TextField
                id="scenarioname"
                style={{ width: "30%", marginLeft: "2%" }}
                label="Nom"
                variant="standard"
              />
            </div>
            <div style={{ marginTop: "2%" }}>
              <FormControl sx={{ m: 1, minWidth: 180 }} size="large">
                <InputLabel id="demo-select-small">Service</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="scenarioservice"
                  value={scenario}
                  label="Scenario"
                  onChange={handleChangeScenario}
                >
                  {services.map((items, index) => {
                    return <MenuItem value={items[0]}>{items[0]}</MenuItem>;
                  })}
                </Select>
              </FormControl>
            </div>
            <div style={{ marginTop: "2%" }}>
              <FormControl sx={{ m: 1, minWidth: 180 }} size="large">
                <InputLabel id="demo-select-small">Actions</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="scenarioaction"
                  value={action}
                  label="Actions"
                  onChange={handleChangeAction}
                >
                  {actions.map((items, index) => {
                    return <MenuItem value={items[0]}>{items[0]}</MenuItem>;
                  })}
                </Select>
              </FormControl>
            </div>
            <div style={{ marginTop: "2%" }}>
              <FormControl sx={{ m: 1, minWidth: 180 }} size="large">
                <InputLabel id="demo-select-small">Reactions</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="scenarioreaction"
                  value={reaction}
                  label="Reaction"
                  onChange={handleChangeReaction}
                >
                  {reactions.map((items, index) => {
                    return <MenuItem value={items[0]}>{items[0]}</MenuItem>;
                  })}
                </Select>
              </FormControl>
            </div>
            <div style={{}}>
              <TextField
                id="scenariotext"
                style={{ width: "30%", marginLeft: "2%" }}
                label="Texte"
                variant="standard"
              />
            </div>
            <div style={{ marginTop: "10%" }}>
              <Button
                style={{
                  backgroundColor: "black",
                  color: "white",
                  borderRadius: "50px",
                  width: "50%",
                }}
                onClick={() => CreateScenario()}
              >
                Créer votre scénario
              </Button>
            </div>
          </Box>
        </Modal>
      </div>
      <MainNavbar />
      <div
        style={{
          fontFamily: "Inter-Black",
          color: "white",
          fontSize: "2rem",
          width: "15%",
          margin: "0 auto",
          marginTop: "5%",
        }}
      >
        Bonjour {username}
      </div>
      <div
        style={{
          fontFamily: "Inter-ExtraBold",
          color: "white",
          fontSize: "2rem",
          marginLeft: "42%",
          marginTop: "8%",
        }}
      >
        Vos scénarios
      </div>
      <div style={{ marginLeft: "28%", marginTop: "2%", maxWidth: "50%" }}>
        <div style={{ display: "flex", flexWrap: "wrap", marginTop: "2%" }}>
          {areas.map((items, index) => {
            return (
              <CardArea
                name={items[2]}
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
                <Typography component="div" style={{fontFamily: 'Inter-ExtraBold'}}>
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