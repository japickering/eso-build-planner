import React, { useState } from "react";
import StepSlider from "./StepSlider";
import ScrollableTabs from "./ScrollableTabs";
import TransferList from "./TransferList";

import { makeStyles } from "@material-ui/core/styles";
// import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
// import CardMedia from "@material-ui/core/CardMedia";
// import CardActions from "@material-ui/core/CardActions";

import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
// import Avatar from "@material-ui/core/Avatar";
// import IconButton from "@material-ui/core/IconButton";
// import Button from "@material-ui/core/Button";
// import ImageIcon from "@material-ui/icons/Image";
// import Collapse from "@material-ui/core/Collapse";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// import MoreVertIcon from "@material-ui/icons/MoreVert";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "0 auto",
    width: "100%",
    minWidth: 300,
    maxWidth: 800,
  },
  header: {
    padding: theme.spacing(2),
    fontSize: 14,
    color: "#222",
  },
  media: {
    backgroundSize: "contain",
    backgroundPositionX: 0,
    paddingTop: "30%",
  },
  avatar: {
    backgroundColor: red[500],
  },
  content: {
    padding: theme.spacing(2),
  },
  dark: {
    backgroundColor: "#222",
    color: "#fff",
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
}));

export default function MUICard(props) {
  // console.log(props.weapons);
  const classes = useStyles();
  const [level, setLevel] = useState(1);
  const [health, setValue] = useState(props.max);
  const [magicka, setMag] = useState(0);
  const [stamina, setStam] = useState(0);
  // const [expanded, setExpanded] = useState(false);
  // const handleExpandClick = () => {
  //   setExpanded(!expanded);
  // };

  const title = String(
    props.name + " Level " + level + " " + props.race + " " + props.classType
  );
  const onLevelInputChange = (event) => {
    setLevel(event.target.value === "" ? "" : Number(event.target.value));
  };
  const onHealthInputChange = (event) => {
    setValue(event.target.value === "" ? "" : Number(event.target.value));
  };
  const onMagInputChange = (event) => {
    setMag(event.target.value === "" ? "" : Number(event.target.value));
  };
  const onStamInputChange = (event) => {
    setStam(event.target.value === "" ? "" : Number(event.target.value));
  };

  const onLevelSliderChange = (event, level) => {
    const max = props.maxLevel;
    if (level <= 0) {
      setLevel(1);
    } else if (level > max) {
      level = max;
      setLevel(level);
    } else {
      setLevel(level);
    }
  };

  const onHealthSliderChange = (event, health) => {
    const max = props.max;
    if (health <= 0) {
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
    if (magicka <= 0) {
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
    if (stamina <= 0) {
      setStam(0);
    } else if (stamina > max) {
      stamina = max;
      setStam(stamina);
    } else {
      setStam(stamina);
    }
  };

  return (
    <div className={classes.root}>
      <Card>
        <CardHeader className={classes.header} title={title}></CardHeader>

        <CardContent className={classes.content}>
          <h2>Attributes</h2>
          <Typography id="level-slider" gutterBottom>
            Level
          </Typography>
          <StepSlider
            max={props.maxLevel}
            value={level}
            onSliderChange={onLevelSliderChange}
            onInputChange={onLevelInputChange}
            aria-labelledby="level-slider"
          />
          <Typography id="health-slider" gutterBottom>
            Health
          </Typography>
          <StepSlider
            max={props.max}
            value={health}
            onSliderChange={onHealthSliderChange}
            onInputChange={onHealthInputChange}
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
      </Card>

      <Card>
        <CardHeader className={classes.header} title="Equipment"></CardHeader>
        <CardContent className={classes.content}>
          <TransferList gear={props.gear} weapons={props.weapons} />
        </CardContent>
      </Card>

      <ScrollableTabs
        {...props}
        health={health}
        magicka={magicka}
        stamina={stamina}
      />
    </div>
  );
}
