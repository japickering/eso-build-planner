import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
// import { capitalize } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: 250,
    height: 450,
    overflow: "auto",
  },
  list: {
    backgroundColor: "#222",
  },
  icon: {
    marginBottom: 8,
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
    margin: theme.spacing(0.5, 0),
    fontSize: 30,
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
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };


  const printBaseItem = (obj) => {
    if (obj.weight) {
      return obj.style + " " + obj.weight + " " + obj.title;
    } else {
      return obj.style + " " + obj.title;
    }
  };

  const printQuality = (obj) => {
    return "quality: " + " " + obj.quality;
  };

  const printStats = (obj) => {
    if (obj.type === "weapon") {
      return obj.damage + " damage";
    } else {
      return obj.stat + " + " + obj.bonus;
    }
  };

  const itemsList = (items) => (
    <Paper className={classes.paper}>
      <List className={classes.list} dense component="div" role="list">
        {items.map((obj) => {
          return (
            <ListItem
              className={classes.column}
              key={obj.title}
              role="list item"
              button
              onClick={handleToggle(obj)}
            >
              <img
                className={classes.icon}
                src={obj.image}
                alt={`${obj.title} icon`}
              />
              <h3 className={classes.header}>{printBaseItem(obj)}</h3>
              <h3 className={classes.header}>{printQuality(obj)}</h3>
              <div>{printStats(obj)}</div>
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
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
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
