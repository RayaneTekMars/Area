import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {CardActionArea } from "@mui/material";
import '../styles/style.css';


export default function CardArea(props) {
  return (
    <Card
      sx={{
        
      }}
      style={{ backgroundColor: props.color }}
    >
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" style={{fontFamily: 'Inter-ExtraBold'}}>
            {props.name}
          </Typography>
          <Typography variant="body4" color="text.secondary">
            {props.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
