import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
// import GridList from "@material-ui/core/GridList";
// import GridListTile from "@material-ui/core/GridListTile";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import BarChartIcon from "@material-ui/icons/BarChart";
import SettingsIcon from "@material-ui/icons/Settings";
// import AccountBoxIcon from "@material-ui/icons/AccountBox";
// import FolderIcon from "@material-ui/icons/Folder";
// import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
// import SvgIcon from "@material-ui/core/SvgIcon";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  gridList: {
    margin: 0,
    padding: 0,
    width: "100%",
  },
  button: {
    width: "100%",
    border: 1,
    outline: 0,
    cursor: "pointer",
  },
  tooltip: {
    width: "100%",
    marginBottom: 5,
    display: "flex",
    flexDirection: "row",
    justifyItems: "space-between",
    backgroundColor: "black",
    color: "#fff",
    textTransform: "capitalize",
    cursor: "zoom-out",
  },
  column: {
    display: "flex",
    flexDirection: "column",
  },
  column2: {
    width: "70%",
    display: "flex",
    flexDirection: "column",
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function setAttribs(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `attributes-${index}`,
  };
}

export default function ScrollableTabs(props) {
  // console.log(props);
  const classes = useStyles();
  const [value, setValue] = useState(0);
  // const [tooltip, setTooltip] = useState("");
  // const [image, setImage] = useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const renderListProps = (props) => {
    let arr = [];
    let i = 0;
    for (const key in props) {
      if (props.hasOwnProperty(key)) {
        let element = props[key];
        arr.push({ id: i++, prop: key, value: element });
      }
    }
    if (arr.length < 1) {
      return;
    } else {
      return arr.map((item) => {
        if (item.prop === "image") {
          return;
        } else if (
          item.prop.indexOf("spell critical") > -1 ||
          item.prop.indexOf("weapon critical") > -1
        ) {
          return (
            <ListItem key={item.id}>
              {item.prop} : {item.value} %
            </ListItem>
          );
        } else {
          return (
            <ListItem key={item.id}>
              {item.prop} : {item.value}
            </ListItem>
          );
        }
      });
    }
  };

  return (
    <div className={classes.root}>
      <Paper>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="standard"
          scrollButtons="auto"
          aria-label="attributes"
        >
          <Tab label="Stats" {...setAttribs(0)} icon={<BarChartIcon />} />
          <Tab label="Resistances" {...setAttribs(1)} icon={<SettingsIcon />} />
        </Tabs>
      </Paper>
      <TabPanel value={value} index={0}>
        <List>
          <Grid container spacing={1} alignItems="flex-start">
            <Grid item>
              <ListItem>health: {props.health}</ListItem>
              <ListItem>health recovery: {props.healthRecovery}</ListItem>
              <ListItem>magicka: {props.magicka}</ListItem>
              <ListItem>magicka recovery: {props.magickaRecovery}</ListItem>
              <ListItem>stamina: {props.stamina}</ListItem>
              <ListItem>stamina recovery: {props.staminaRecovery}</ListItem>
            </Grid>
            <Grid item>
              {renderListProps(props.spell)}
              {renderListProps(props.weapon)}
            </Grid>
          </Grid>
        </List>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <List>{renderListProps(props.resistances)}</List>
      </TabPanel>
    </div>
  );
}
