import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
// import { capitalize } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: 250,
    height: 400,
    overflow: "auto",
    backgroundColor: "#222",
  },
  icon: {
    margin: 5,
  },
  notChecked: {
    display: "block",
    flexDirection: "column",
    border: "1px solid transparent",
    backgroundColor: "#000",
    color: "#fff",
  },
  checked: {
    width: "98%",
    display: "block",
    flexDirection: "column",
    border: "1px solid gold",
    backgroundColor: "#000",
    color: "#fff",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#000",
    color: "#fff",
  },
  header: {
    display: "block",
    fontSize: 14,
  },
  button: {
    margin: theme.spacing(1, 0),
  },
}));

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

export default function TransferList(props) {
  const classes = useStyles();
  const [checked, setChecked] = useState([]);
  const [left, setLeft] = useState([...props.gear, ...props.weapons]);
  const [right, setRight] = useState([]);
  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (obj) => () => {
    const currentIndex = checked.indexOf(obj);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(obj);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  /*   const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };
  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  }; */

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));

    let amount = 0;
    let damage = 0;
    leftChecked.forEach((item) => {
      if (item.type === "armour") {
        amount += item.bonus;
      }
      if (item.type === "weapon") {
        damage += item.damage;
      }
    });
    props.onArmourBoost(amount);
    props.onWeaponDamageBoost(damage);
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));

    let amount = 0;
    let damage = 0;
    rightChecked.forEach((item) => {
      if (item.type === "armour") {
        amount += item.bonus;
      }
      if (item.type === "weapon") {
        damage += item.damage;
      }
    });
    props.onArmourWeaken(amount);
    props.onWeaponDamageWeaken(damage);
  };

  const printBaseItem = (obj) => {
    if (obj.weight) {
      return `${obj.style} ${obj.weight} ${obj.title}`;
    } else {
      return `${obj.style} ${obj.title}`;
    }
  };

  const printQuality = (obj) => {
    return `quality: ${obj.quality}`;
  };

  const printStats = (obj) => {
    if (obj.type === "weapon") {
      return `${obj.damage} damage`;
    } else {
      return `${obj.effect} ${obj.bonus}`;
    }
  };

  const itemsList = (items) => (
    <Paper className={classes.paper}>
      <List className={classes.list} dense component="div" role="list">
        {items.map((obj) => {
          return (
            <ListItem
              key={obj.title}
              className={
                checked.indexOf(obj) !== -1
                  ? classes.checked
                  : classes.notChecked
              }
              role="list item"
              button
              onClick={handleToggle(obj)}
            >
              <img
                className={classes.icon}
                src={obj.image}
                alt={`${obj.title} icon`}
              />
              <h3 className={classes.header}>
                {obj.quality === "epic" && (
                  <span style={{ color: "#ff00ff" }}>{printBaseItem(obj)}</span>
                )}
                {obj.quality === "rare" && (
                  <span style={{ color: "#00ffff" }}>{printBaseItem(obj)}</span>
                )}
                {obj.quality === "uncommon" && (
                  <span style={{ color: "#00ff00" }}>{printBaseItem(obj)}</span>
                )}
                {obj.quality === "common" && printBaseItem(obj)}
              </h3>
              <p className={classes.header}>{printQuality(obj)}</p>
              <p className={classes.header}>{printStats(obj)}</p>
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );

  return (
    <Grid
      container
      spacing={2}
      justify="center"
      alignItems="center"
      className={classes.root}
    >
      <Grid item>
        <h3 className={classes.header}>Backpack</h3>
        {itemsList(left)}
      </Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            className={classes.button}
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            <Icon>add_circle</Icon>
          </Button>
          <Button
            className={classes.button}
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            <Icon>remove_circle</Icon>
          </Button>
        </Grid>
      </Grid>
      <Grid item>
        <h3 className={classes.header}>Equipped</h3>
        {itemsList(right)}
      </Grid>
    </Grid>
  );
}
