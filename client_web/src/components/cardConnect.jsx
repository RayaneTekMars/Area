import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";

export default function CardAreaConnect(props) {
  return (
    <Card
      sx={{
        
      }}
      style={{ backgroundColor: props.color }}
    >
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.name}
          </Typography>
          <Typography variant="body4" color="text.secondary">
            {props.description}
          </Typography>
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
