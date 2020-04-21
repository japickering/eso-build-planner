import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
// import FolderIcon from "@material-ui/icons/Folder";
import BarChartIcon from "@material-ui/icons/BarChart";
import SettingsIcon from "@material-ui/icons/Settings";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
// import SvgIcon from "@material-ui/core/SvgIcon";

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
    width: "100%",
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

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
          <Tab label="Resistances" {...setAttribs(1)} icon={<SettingsIcon />} />
          <Tab
            label="Racial"
            onClick={() => {
              window.scrollTo(0, 400);
            }}
            {...setAttribs(2)}
            icon={<PowerSettingsNewIcon />}
          />
          <Tab
            onClick={() => {
              window.scrollTo(0, 400);
            }}
            label="Weapons"
            {...setAttribs(3)}
            icon={<BarChartIcon />}
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
              <ListItem>spell damage: {props.spell.damage}</ListItem>
              <ListItem>spell critical: {props.spell.critical} %</ListItem>
              <ListItem>weapon damage: {props.weapon.damage}</ListItem>
              <ListItem>weapon critical: {props.weapon.critical} %</ListItem>
            </Grid>
          </Grid>
        </List>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <List>
          <ListItem>physical: {props.resistances.physical}</ListItem>
          <ListItem>spell: {props.resistances.spell}</ListItem>
          <ListItem>disease: {props.resistances.disease}</ListItem>
          <ListItem>frost: {props.resistances.frost}</ListItem>
          <ListItem>oblivion: {props.resistances.oblivion}</ListItem>
          <ListItem>shock: {props.resistances.shock}</ListItem>
        </List>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <List>
          <ListItem>
            stamina recovery: {props.racialBonus.staminaRegen}
          </ListItem>
          <ListItem>
            two handed weapon xp: {props.racialBonus.twoHandedWeaponXp}
          </ListItem>
        </List>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <List>
          <ListItem>
            main hand: {props.weapons.mainHand.name} damage:{" "}
            {props.weapons.mainHand.damage} range:{" "}
            {props.weapons.mainHand.range}
          </ListItem>
          <ListItem>
            off hand: {props.weapons.offHand.name} defence:{" "}
            {props.weapons.offHand.defence}
          </ListItem>
          <ListItem>
            backup weapon: {props.weapons.backup.name} damage:{" "}
            {props.weapons.backup.damage} range: {props.weapons.backup.range}
          </ListItem>
        </List>
      </TabPanel>
    </div>
  );
}
