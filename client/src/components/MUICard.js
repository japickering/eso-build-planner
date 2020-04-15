import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// import ListItemIcon from "@material-ui/core/ListItemIcon";
// import ListItemText from "@material-ui/core/ListItemText";

import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { blue } from "@material-ui/core/colors";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// import MoreVertIcon from "@material-ui/icons/MoreVert";

import StepSlider from "./StepSlider";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 10,
    minWidth: 275,
    maxWidth: 480,
  },
  title: {
    color: "#222",
  },
  media: {
    backgroundSize: "contain",
    backgroundPositionX: 0,
    paddingTop: "40%",
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
  const classes = useStyles();
  const title = String(
    props.name +
      " Level " +
      props.level +
      " " +
      props.race +
      " " +
      props.classType
  );
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [health, setValue] = React.useState(0);
  const [magicka, setMag] = React.useState(0);
  const [stamina, setStam] = React.useState(0);

  const onInputChange = (event) => {
    setValue(event.target.value === "" ? "" : Number(event.target.value));
  };
  const onMagInputChange = (event) => {
    setMag(event.target.value === "" ? "" : Number(event.target.value));
  };
  const onStamInputChange = (event) => {
    setStam(event.target.value === "" ? "" : Number(event.target.value));
  };

  const onSliderChange = (event, health) => {
    const max = props.max;
    if (health < 0) {
      setValue(0);
    } else if (health > max) {
      health = max;
      setValue(health);
    } else {
      setValue(health);
    }
  };

  const onMagSliderChange = (event, magicka) => {
    const max = props.max;
    if (magicka < 0) {
      setMag(0);
    } else if (magicka > max) {
      magicka = max;
      setMag(magicka);
    } else {
      setMag(magicka);
    }
  };

  const onStaminaSliderChange = (event, stamina) => {
    const max = props.max;
    if (stamina < 0) {
      setStam(0);
    } else if (stamina > max) {
      stamina = max;
      setStam(stamina);
    } else {
      setStam(stamina);
    }
  };

  return (
    <Card className={classes.root}>
      <CardHeader
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
        <Typography id="health-slider" gutterBottom>
          Health
        </Typography>
        <StepSlider
          max={props.max}
          value={health}
          onSliderChange={onSliderChange}
          onInputChange={onInputChange}
          aria-labelledby="health-slider"
        />
        <Typography id="magicka-slider" gutterBottom>
          Magicka
        </Typography>
        <StepSlider
          max={props.max}
          value={magicka}
          onSliderChange={onMagSliderChange}
          onInputChange={onMagInputChange}
          aria-labelledby="magicka-slider"
        />
        <Typography id="stamina-slider" gutterBottom>
          Stamina
        </Typography>
        <StepSlider
          max={props.max}
          value={stamina}
          onSliderChange={onStaminaSliderChange}
          onInputChange={onStamInputChange}
          aria-labelledby="stamina-slider"
        />
      </CardContent>

      <CardActions disableSpacing>
        <Button variant="outlined" onClick={handleExpandClick}>
          view stats
        </Button>
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
          <Typography>Stats:</Typography>
          <List>
            <ListItem>health: {health}</ListItem>
            <ListItem>magicka: {magicka}</ListItem>
            <ListItem>stamina: {stamina}</ListItem>
            <ListItem>physical penetration: {props.penetration.physical}</ListItem>
            <ListItem>spell penetration: {props.penetration.spell}</ListItem>
          </List>
          <Typography>Resistances:</Typography>
          <List>
            <ListItem>physical: {props.resistances.physical}</ListItem>
            <ListItem>spell: {props.resistances.spell}</ListItem>
            <ListItem>frost: {props.resistances.frost}</ListItem>
            <ListItem>disease: {props.resistances.disease}</ListItem>
            <ListItem>oblivion: {props.resistances.oblivion}</ListItem>
            <ListItem>poison: {props.resistances.poison}</ListItem>
            <ListItem>shock: {props.resistances.shock}</ListItem>
          </List>
        </CardContent>
      </Collapse>
    </Card>
  );
}
