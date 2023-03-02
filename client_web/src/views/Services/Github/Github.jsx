import React, { useEffect } from "react";
import MainNavbar from "../../../components/mainNavbar";
import GithubLogo from "../../../assets/logo_github.png";
import "../../../styles/github.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import GithubButton from "../../../components/githubButton";
import Tooltip from '@mui/material/Tooltip';


export default function GithubPage() {
  let actions = [
    "NewCommit",
  ];
  let reactions = [
    "CreatePullRequest",
    "CreateIssue"
  ];

  let descriptionActions = [
    "Trigger when a new commit is pushed to a repository",
  ];
  let descriptionReactions = [
    "Create a pull request",
    "Create a new issue",
  ];
  useEffect(() => {
    document.body.style.backgroundColor = "#000000";
  }, []);
  return (
    <div>
      <MainNavbar />
      <div className="divGithubLogo">
        <img src={GithubLogo} alt="Github Logo" />
      </div>
      <div className="divGithubTitle">
        <h1>Github</h1>
      </div>
      <div className="divGithubDescription">
        <p>
        Github is a web hosting and software development management service
        </p>
      </div>
      <div className="divGithubConnectionButton">
        <GithubButton />
      </div>
      <div className="divGithubActionText">
        <h2>Actions </h2>
      </div>
      <div className="divGithubActionCards">
        {actions.map((action, index) => (
          <Card sx={{ width: 180, marginLeft: "1%", height: 180, borderRadius: "20px"}}>
          <Tooltip title={descriptionActions[index]}>
            <CardContent
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "80%",
              }}
            >
              <h1 style={{ textAlign: "center", fontSize: "14px" }}>{action}</h1>
            </CardContent>
          </Tooltip>
        </Card>  
        ))}
      </div>
      <div className="divGithubActionText">
        <h2>Reactions </h2>
      </div>
      <div className="divGithubReactionCards">
        {reactions.map((reaction, index) => (
          <Card sx={{ width: 180, marginLeft: "1%", height: 180, borderRadius: "20px"}}>
          <Tooltip title={descriptionReactions[index]}>
            <CardContent
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "80%",
              }}
            >
              <h1 style={{ textAlign: "center", fontSize: "14px" }}>{reaction}</h1>
            </CardContent>
          </Tooltip>
        </Card>
        ))}
      </div>
    </div>
  );
}
