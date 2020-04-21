import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

// import FolderIcon from "@material-ui/icons/Folder";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import BarChartIcon from "@material-ui/icons/BarChart";
import SettingsIcon from "@material-ui/icons/Settings";
// import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
// import SvgIcon from "@material-ui/core/SvgIcon";

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
    width: "100%",
  },
  gridList: {
    margin: 0,
    padding: 0,
    width: 240,
    height: 80,
  },
  button: {
    border: 1,
    outline: 0,
    cursor: "pointer",
  },
  tooltip: {
    display: "block",
    width: "100%",
    height: 80,
    margin: 0,
    padding: 5,
    backgroundColor: "black",
    borderColor: "black",
    color: "#fff",
    textTransform: "capitalize",
  },
}));

// function HomeIcon(props) {
//   return (
//     <SvgIcon {...props}>
//       <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
//     </SvgIcon>
//   );
// }

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
  const [value, setValue] = React.useState(0);
  const [tooltip, setTooltip] = React.useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onIconClick = (obj) => {
    let str =
      obj.title +
      ", cast time: " +
      obj.cast +
      ", damage: " +
      obj.damage +
      ", range: " +
      obj.range +
      " (metres)";
    setTooltip(str);
  };

  const renderGridList = (props) => {
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
          return (
            <GridListTile key={item.value} className={classes.gridListTile}>
              <button
                className={classes.button}
                onClick={() => {
                  onIconClick(props);
                }}
              >
                <img src={item.value} alt="skill icon" />
              </button>
            </GridListTile>
          );
        }
      });
    }
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
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="standard"
          scrollButtons="auto"
          aria-label="attributes"
        >
          <Tab
            label="Stats"
            onClick={() => {
              window.scrollTo(0, 400);
            }}
            {...setAttribs(0)}
            icon={<BarChartIcon />}
          />
          <Tab
            label="Resistances"
            onClick={() => {
              window.scrollTo(0, 400);
            }}
            {...setAttribs(1)}
            icon={<SettingsIcon />}
          />
          <Tab
            label="Weapons"
            onClick={() => {
              window.scrollTo(0, 400);
            }}
            {...setAttribs(2)}
            icon={<AccountBoxIcon />}
          />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <List>
          <Grid container spacing={2} alignItems="flex-start">
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
              {renderListProps(props.racialBonus)}
            </Grid>
          </Grid>
        </List>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <List>{renderListProps(props.resistances)}</List>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <GridList cellHeight={80} cols={3} className={classes.gridList}>
          {renderGridList(props.weapons.main)}
          {renderGridList(props.weapons.offHand)}
          {renderGridList(props.weapons.backup)}
        </GridList>
        {tooltip !== "" && (
          <List>
            <ListItem className={classes.tooltip}>{tooltip}</ListItem>
          </List>
        )}
      </TabPanel>
    </div>
  );
}
