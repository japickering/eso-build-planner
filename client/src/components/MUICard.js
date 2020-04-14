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
// import MoreVertIcon from "@material-ui/icons/MoreVert";

import StepSlider from "./StepSlider";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    maxWidth: 480,
  },
  title: {
    color: "#222",
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
  const classes = useStyles();
  const title = String(props.name + " Level " + props.level + " " + props.race + " " + props.classType);
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [value, setValue] = React.useState(0);
  
  const onSliderChange = (event, value) => {
    const max = props.max;
    if (value < 0) {
      setValue(0);
    }
    else if (value > max) {
      value = max;
      setValue(value);
    } 
    else {
      setValue(value);
    }    
  };

  const [magicka, setMag] = React.useState(0);
  const onMagSliderChange = (event, magicka) => {
    const max = props.max;
    if (magicka < 0) {
      setMag(0);
    }
    else if (magicka > max) {
      magicka = max;
      setMag(magicka);
    } 
    else {
      setMag(magicka);
    }    
  };

  const [stamina, setStam] = React.useState(0);
  const onStaminaSliderChange = (event, stamina) => {
    const max = props.max;
    if (stamina < 0) {
      setStam(0);
    }
    else if (stamina > max) {
      stamina = max;
      setStam(stamina);
    } 
    else {
      setStam(stamina);
    }    
  };

  const onInputChange = (event) => {
    setValue(event.target.value === "" ? "" : Number(event.target.value));
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
        <StepSlider
          title="Health"
          max={props.max}
          value={value}
          onSliderChange={onSliderChange}
          onInputChange={onInputChange}
          aria-labelledby="mui-card"
        />
        <StepSlider
          title="Magicka"
          max={props.max}
          value={magicka}
          onSliderChange={onMagSliderChange}
          onInputChange={onInputChange}
          aria-labelledby="mui-card"
        />
        <StepSlider
          title="Stamina"
          max={props.max}
          value={stamina}
          onSliderChange={onStaminaSliderChange}
          onInputChange={onInputChange}
          aria-labelledby="mui-card"
        />
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
