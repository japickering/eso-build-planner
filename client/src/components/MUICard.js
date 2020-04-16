import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
// import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import Typography from "@material-ui/core/Typography";
import { blue } from "@material-ui/core/colors";
import Avatar from "@material-ui/core/Avatar";
// import IconButton from "@material-ui/core/IconButton";
// import Button from "@material-ui/core/Button";
// import ImageIcon from "@material-ui/icons/Image";
// import Collapse from "@material-ui/core/Collapse";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// import MoreVertIcon from "@material-ui/icons/MoreVert";

import StepSlider from "./StepSlider";
import ScrollableTabs from "./ScrollableTabs";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 5,
    width: "100%",
    minWidth: 275,
    maxWidth: 480,
  },
  title: {
    color: "#222",
  },
  media: {
    backgroundSize: "contain",
    backgroundPositionX: 0,
    paddingTop: "30%",
  },
  avatar: {
    backgroundColor: blue[10],
  },
  content: {
    padding: theme.spacing(4),
  },
  dark: {
    backgroundColor: "#222",
    color: "#fff",
  },
  underline: {
    borderBottom: "1px solid whitesmoke",
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

  const renderProps = (props) => {
    let arr = [];
    for (const key in props) {
      if (props.hasOwnProperty(key)) {
        let element = props[key];
        arr.push({ label: key, value: element });
      }
    }
    if (arr.length <= 0) {
      return;
    } else {
      return arr.map((item) => {
        return (
          <ListItem>
            {item.label}: {item.value}
          </ListItem>
        );
      });
    }
  };

  return (
    <div className={classes.root}>
      <Card>
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

        <CardContent className={classes.content}>
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
      </Card>

      <ScrollableTabs
        health={health}
        magicka={magicka}
        stamina={stamina}
        penetration={props.penetration}
        resistances={props.resistances}
        racialBonus={props.racialBonus}
      />
    </div>
  );
}
