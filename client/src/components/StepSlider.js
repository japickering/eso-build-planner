import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/core/Slider";
import Input from "@material-ui/core/Input";
// import VolumeUp from '@material-ui/icons/VolumeUp';

const useStyles = makeStyles({
  root: {
    width: 250,
  },
  input: {
    width: 42,
  },
});

export default function StepSlider(props) {
  // console.log(props);
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleBlur = (max) => {
    if (value < 0) {
      setValue(0);
    } else if (value > max) {
      setValue(max);
    }
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <Slider
            defaultValue={0}
            value={props.value}
            onChange={props.onSliderChange}
            onBlur={handleBlur(props.max)}
            aria-labelledby="input-slider"
          />
        </Grid>
        <Grid item>
          <Input
            className={classes.input}
            value={props.value}
            margin="dense"
            onChange={props.onInputChange}
            onBlur={handleBlur(props.max)}
            inputProps={{
              step: 1,
              min: 0,
              max: 64,
              type: "number",
              "aria-labelledby": "input-slider",
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
}
