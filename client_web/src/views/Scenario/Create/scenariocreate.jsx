import React, { useEffect } from "react";
import "../../../styles/style.css";
import "../../../styles/scenariocreate.css";
import MainNavbar from "../../../components/mainNavbar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { TextField } from "@material-ui/core";


function CreateScenario(actionState, reactionState)
{;
    const data = {
        name: document.getElementById("scenarioName").value,
        trigger: {
            name: actionState.actionState,
            serviceName: "Twitter",
            params: [
              {
                  name: "text",
                  value: document.getElementById("scenarioActionParameters").value,
                  required: true,
              },
          ],
        },
        reaction: {
            name: reactionState.reactionState,
            serviceName: "Twitter",
            params: [
                {
                    name: "text",
                    value: document.getElementById("scenarioReactionParameters").value,
                    required: true,
                },
            ],
        },
    };
    fetch("http://localhost:8080/scenarios/create", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("jwt"),
    },
    body: JSON.stringify(data)
  })
        .then((response) => response.json())
        .then((data) => {
            console.log("Success:", data);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

export default function ScenarioPage() {
  let services = [
    [
      "Spotify",
      "#1ED760",
      `<svg
        width="65"
        height="65"
        viewBox="0 0 65 65"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M32.4985 0.107178C14.6045 0.107178 0.0978851 14.6134 0.0978851 32.5074C0.0978851 50.4021 14.6045 64.9072 32.4985 64.9072C50.3943 64.9072 64.8994 50.4021 64.8994 32.5074C64.8994 14.6146 50.3943 0.108725 32.4981 0.108725L32.4985 0.107178ZM47.3571 46.8375C46.7768 47.7893 45.5309 48.0911 44.5792 47.5069C36.9718 42.8602 27.3952 41.8078 16.1169 44.3846C15.0301 44.6322 13.9468 43.9512 13.6991 42.864C13.4504 41.7768 14.1286 40.6935 15.2181 40.4459C27.5604 37.625 38.1473 38.8402 46.6878 44.0596C47.6396 44.6438 47.9414 45.8858 47.3571 46.8375ZM51.3229 38.0142C50.5917 39.2039 49.0363 39.5792 47.8485 38.848C39.1393 33.4936 25.8634 31.9433 15.5621 35.0702C14.2261 35.4738 12.8151 34.7208 12.4096 33.3872C12.0072 32.0512 12.7605 30.6429 14.0942 30.2366C25.8611 26.6663 40.4896 28.3957 50.4911 34.5417C51.6789 35.273 52.0542 36.8279 51.3229 38.0142ZM51.6634 28.8275C41.2208 22.625 23.992 22.0547 14.0218 25.0807C12.4208 25.5663 10.7277 24.6625 10.2425 23.0615C9.75735 21.4597 10.6604 19.7677 12.2626 19.281C23.7076 15.8066 42.7336 16.4779 54.7563 23.6151C56.1995 24.4698 56.6715 26.3296 55.8164 27.7678C54.9652 29.2078 53.1003 29.6826 51.6649 28.8275H51.6634Z"
          fill="white"
        />
      </svg>`,
      "spotify",
    ],
    [
      "Twitch",
      "#9146FF",
      `<svg width="56" height="65" viewBox="0 0 56 65" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.6667 0L0 11.6071V53.3929H14V65L25.6667 53.3929H35L56 32.5V0H11.6667ZM51.3333 30.1786L42 39.4643H32.6667L24.5 47.5893V39.4643H14V4.64286H51.3333V30.1786Z" fill="white"/>
    <path d="M44.3333 12.7678H39.6667V26.6964H44.3333V12.7678Z" fill="white"/>
    <path d="M31.5 12.7678H26.8333V26.6964H31.5V12.7678Z" fill="white"/>
    </svg>
    `,
      "twitch",
    ],
    [
      "Discord",
      "#5865F2",
      `<svg width="76" height="59" viewBox="0 0 76 59" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M64.3372 4.94019C59.4932 2.70806 54.2988 1.06352 48.8677 0.121627C48.7688 0.103449 48.67 0.148878 48.619 0.239737C47.951 1.433 47.211 2.98971 46.6928 4.21327C40.8513 3.335 35.0397 3.335 29.318 4.21327C28.7997 2.96251 28.0329 1.433 27.3618 0.239737C27.3109 0.15191 27.2121 0.10648 27.1132 0.121627C21.685 1.06051 16.4906 2.70505 11.6436 4.94019C11.6017 4.95835 11.5657 4.98867 11.5418 5.02801C1.68907 19.8108 -1.01001 34.2302 0.31407 48.4708C0.320062 48.5405 0.359005 48.6071 0.412927 48.6495C6.9135 53.4438 13.2104 56.3543 19.3904 58.2835C19.4893 58.3138 19.5941 58.2775 19.657 58.1957C21.1189 56.1908 22.422 54.0768 23.5393 51.8537C23.6053 51.7235 23.5423 51.5691 23.4076 51.5176C21.3406 50.7301 19.3724 49.7701 17.4791 48.6798C17.3294 48.592 17.3174 48.3768 17.4552 48.2739C17.8536 47.974 18.2521 47.6621 18.6325 47.3471C18.7014 47.2896 18.7973 47.2774 18.8782 47.3138C31.3161 53.0168 44.7816 53.0168 57.0727 47.3138C57.1536 47.2744 57.2495 47.2866 57.3213 47.3441C57.7019 47.6591 58.1003 47.974 58.5017 48.2739C58.6395 48.3768 58.6305 48.592 58.4807 48.6798C56.5875 49.7912 54.6193 50.7301 52.5493 51.5146C52.4145 51.5661 52.3546 51.7235 52.4205 51.8537C53.5618 54.0737 54.8649 56.1877 56.2998 58.1927C56.3598 58.2775 56.4676 58.3138 56.5665 58.2835C62.7764 56.3543 69.0733 53.4438 75.5739 48.6495C75.6308 48.6071 75.6668 48.5435 75.6728 48.4738C77.2574 32.0101 73.0186 17.7089 64.436 5.03102C64.415 4.98867 64.3792 4.95835 64.3372 4.94019ZM25.3967 39.7997C21.6521 39.7997 18.5666 36.3472 18.5666 32.107C18.5666 27.8669 21.5922 24.4143 25.3967 24.4143C29.2311 24.4143 32.2867 27.8972 32.2268 32.107C32.2268 36.3472 29.2011 39.7997 25.3967 39.7997ZM50.65 39.7997C46.9055 39.7997 43.82 36.3472 43.82 32.107C43.82 27.8669 46.8455 24.4143 50.65 24.4143C54.4845 24.4143 57.54 27.8972 57.4802 32.107C57.4802 36.3472 54.4845 39.7997 50.65 39.7997Z" fill="white"/>
    </svg>
    `,
      "discord",
    ],
  ];

  let listActions = [
    "Changer de musique",
    "Ajouter à la Playlist",
    "Ajouter à la file d'attente",
    "Like",
  ];

  let listReactions = [
    "Lancer une musique",
    "Lancer une playlist",
    "Lancer une file d'attente",
  ];

  const [actionState, setActionState] = React.useState(listActions[0]);
  const handleChangeAction = (event: SelectChangeEvent) => {
    setActionState(event.target.value);
  };
  const [reactionState, setReactionState] = React.useState(listReactions[0]);
  const handleChangeReaction = (event: SelectChangeEvent) => {
    setReactionState(event.target.value);
  };
  useEffect(() => {
    document.body.style.backgroundColor = "#222222";
  }, []);
  return (
    <div className="PageStyle">
      <MainNavbar />
      <div className="ScenarioTitle">Scénario</div>
      <div>
        <TextField
          id="scenarioName"
          label="Name"
          style={{
            width: "100%",
            marginTop: "4%",
            backgroundColor: "white",
            borderRadius: "4px",
            border: "1px solid #ced4da",
          }}
        />
      </div>
      <div className="divServicesCardsCreate">
        {services.map((service, index) => (
          <Link style={{ textDecoration: "none", marginLeft: "1%" }}>
            <Card
              sx={{
                width: 120,
                marginLeft: "4%",
                height: 120,
                backgroundColor: service[1],
                borderRadius: "39px",
              }}
            >
              <CardMedia
                sx={{
                  height: 20,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                title="service media"
              />
              <CardContent
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "40%",
                }}
              >
                <div dangerouslySetInnerHTML={{ __html: service[2] }} />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      <div>
        <Box sx={{ minWidth: 120, backgroundColor: "white" }}>
          <FormControl fullWidth>
            <Select
              id="scenarioAction"
              value={actionState}
              onChange={handleChangeAction}
            >
              {listActions.map((action, index) => (
                <MenuItem value={action}> {action}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </div>
      <div>
        <TextField
          id="scenarioActionParameters"
          label="Parameters"
          style={{
            width: "100%",
            marginTop: "4%",
            backgroundColor: "white",
            borderRadius: "4px",
            border: "1px solid #ced4da",
          }}
        />
      </div>
      <div className="divServicesCardsCreate">
        {services.map((service, index) => (
          <Link style={{ textDecoration: "none", marginLeft: "1%" }}>
            <Card
              sx={{
                width: 120,
                marginLeft: "4%",
                height: 120,
                backgroundColor: service[1],
                borderRadius: "39px",
              }}
            >
              <CardMedia
                sx={{
                  height: 20,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                title="service media"
              />
              <CardContent
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "40%",
                }}
              >
                <div dangerouslySetInnerHTML={{ __html: service[2] }} />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      <div>
        <Box sx={{ minWidth: 120, backgroundColor: "white" }}>
          <FormControl fullWidth>
            <Select
              labelId="demo-simple-select-label"
              id="scenarioReaction"
              value={reactionState}
              onChange={handleChangeReaction}
            >
              {listReactions.map((reaction, index) => (
                <MenuItem value={reaction}> {reaction}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </div>
      <div>
        <TextField
          id="scenarioReactionParameters"
          label="Parameters"
          style={{
            width: "100%",
            marginTop: "4%",
            backgroundColor: "white",
            borderRadius: "4px",
            border: "1px solid #ced4da",
          }}
        />
      </div>
      <div>
        <Button
          style={{
            color: "black",
            borderRadius: "50px",
            backgroundColor: "white",
            marginTop: "15%",
          }}
          onClick={() => CreateScenario({actionState}, {reactionState})}
        >
          Créer
        </Button>
      </div>
    </div>
  );
}
