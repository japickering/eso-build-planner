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
    width: 300,
    height: 400,
    backgroundColor: "#000",
    overflow: "auto",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#000",
    color: "#fff",
  },
  header: {
    display: "block",
    fontSize: 12,
  },
  button: {
    margin: theme.spacing(1, 0),
  },
  icon: {
    margin: 5,
  },
  notChecked: {
    width: "48%",
    display: "inline-block",
    border: "1px solid transparent",
    borderRadius: 4,
    backgroundColor: "#000",
    color: "#fff",
    textAlign: "left",
    verticalAlign: "top",
  },
  checked: {
    width: "48%",
    display: "inline-block",
    border: "1px solid gold",
    borderRadius: 4,
    backgroundColor: "#000",
    color: "#fff",
    textAlign: "left",
    verticalAlign: "top",
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

  const onEquipItem = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));

    let amount = 0;
    let mag = 0;
    let stam = 0;
    let damage = 0;

    leftChecked.forEach((item) => {
      if (item.type === "armour") {
        amount += item.bonus;
      }
      if (item.type === "weapon") {
        damage += item.damage;
      }
      if (item.effect === "magicka") {
        mag += item.bonus;
      }
      if (item.effect === "stamina") {
        stam += item.bonus;
      }
    });
    props.onArmourBoost(amount);
    props.onMagBoost(mag);
    props.onStamBoost(stam);
    props.onWeaponDamageBoost(damage);
  };

  const onUnequipItem = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));

    let amount = 0;
    let mag = 0;
    let stam = 0;
    let damage = 0;

    rightChecked.forEach((item) => {
      if (item.type === "armour") {
        amount += item.bonus;
      }
      if (item.type === "weapon") {
        damage += item.damage;
      }
      if (item.effect === "magicka") {
        mag += item.bonus;
      }
      if (item.effect === "stamina") {
        stam += item.bonus;
      }
    });
    props.onArmourWeaken(amount);
    props.onMagWeaken(mag);
    props.onStamWeaken(stam);
    props.onWeaponDamageWeaken(damage);
  };

  const getTitle = (obj) => {
    if (obj.weight) {
      return `${obj.style} ${obj.weight} ${obj.title} of ${obj.effect}`;
    } else {
      return `${obj.style} ${obj.title}`;
    }
  };

  const printTitleByQuality = (obj) => {
    if (obj.quality === "legendary") {
      return <span style={{ color: "gold" }}>{getTitle(obj)}</span>;
    } else if (obj.quality === "epic") {
      return <span style={{ color: "#ff00ff" }}>{getTitle(obj)}</span>;
    } else if (obj.quality === "rare") {
      return <span style={{ color: "#00AAFF" }}>{getTitle(obj)}</span>;
    } else if (obj.quality === "uncommon") {
      return <span style={{ color: "#00ff00" }}>{getTitle(obj)}</span>;
    } else {
      return getTitle(obj);
    }
  };

  const printStats = (obj) => {
    if (obj.type === "weapon") {
      if (obj.effect === "fire") {
        return `+ ${obj.bonus} ${obj.effect} damage, `;
      } else {
        return `+ ${obj.damage} damage`;
      }
    } else {
      return `${obj.effect} + ${obj.bonus}`;
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
              <h3 className={classes.header}>{printTitleByQuality(obj)}</h3>
              {checked.indexOf(obj) !== -1 && (
                <div>
                  <p className={classes.header}>{printStats(obj)}</p>
                </div>
              )}
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );

  return (
    <Grid container spacing={2} alignItems="center" className={classes.root}>
      <Grid item>
        <h3 className={classes.header}>Backpack</h3>
        {itemsList(left)}
      </Grid>
      <Grid item>
        <Grid container direction="column">
          <Button
            color="primary"
            className={classes.button}
            onClick={onEquipItem}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            <Icon>add_circle</Icon>
          </Button>
          <Button
            className={classes.button}
            onClick={onUnequipItem}
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
