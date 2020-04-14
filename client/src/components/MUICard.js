import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";

import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { blue } from "@material-ui/core/colors";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import StepSlider from "./StepSlider";
import { capitalize } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    maxWidth: 480,
  },
  header: {
    textTransform: "capitalize",
  },
  title: {
    color: "#222"
  },
  media: {
    backgroundSize: "contain",
    backgroundPositionX: 0,
    paddingTop: "50%",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: blue[10],
  },
}));

export default function MUICard(props) {
  // console.log(props.resistances);
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const title =
    props.name + " " + props.level + " " + props.race + " " + props.classType;

  return (
    <Card className={classes.root}>
      <CardHeader
        className={classes.header}
        avatar={
          <Avatar aria-label="alliance" className={classes.avatar}>
            D
          </Avatar>
        }
        title={title}
      ></CardHeader>

      <CardMedia
        className={classes.media}
        image={props.image}
        title={props.alliance}
      />

      <CardContent>
        <StepSlider title="Health" max={64} />
        <StepSlider title="Magicka" max={64} />
        <StepSlider title="Stamina" max={64} />
      </CardContent>

      <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Resistances:</Typography>
          <Typography paragraph>
            physical: {props.resistances.physical}
            <br />
            spell: {props.resistances.spell}
            <br />
            frost: {props.resistances.frost}
            <br />
            disease: {props.resistances.disease}
            <br />
            oblivion: {props.resistances.oblivion}
            <br />
            poison: {props.resistances.poison}
            <br />
            shock: {props.resistances.shock}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
