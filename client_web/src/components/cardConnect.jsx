import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Button, CardActionArea, CardActions, CardMedia } from "@mui/material";
import TwitterLogo from "../assets/logo_twitter.jpeg";

export default function CardAreaConnect(props) {
  return (
    <Card
      sx={{
        
      }}
      style={{ backgroundColor: props.color }}
    >
      <CardActionArea>
        <CardContent>
        <CardMedia
        component="img"
        height="194"
        maxWidth="20"
        maxHeight="20"
        image={TwitterLogo}
        alt="logo"
      />
        </CardContent>
      </CardActionArea>
      <CardActions>
      <Button style={{
              color: "black",
              borderRadius: "20px",
              backgroundColor: "white",
              width: "30px",
            }} size="small">Connect</Button>
    </CardActions>
    </Card>
  );
}
