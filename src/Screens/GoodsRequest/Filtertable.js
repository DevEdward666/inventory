import {
  FormControl,
  Grid,
  Paper,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import React, { useCallback, useState } from "react";
import useStyles from "./style";
import { useDispatch, useSelector } from "react-redux";
import { action_set_stockclass_search } from "../../Services/Actions/Inventory_Actions";
const Filtertable = () => {
  const classes = useStyles();
  const getstockclass = useSelector(
    (state) => state.Inventory_Reducers.getstockclass
  );
  const dispatch = useDispatch();
  const [stockclass, setstockclass] = useState("");
  const handleChange = useCallback(
    (event) => {
      setstockclass(event.target.value);
      dispatch(action_set_stockclass_search(event.target.value));
    },
    [dispatch]
  );
  return (
    <Grid item xs={2} className={classes.GridStyle}>
      <FormControl variant="filled" className={classes.formControl}>
        <InputLabel id="demo-simple-select-filled-label">
          Stock Class
        </InputLabel>
        <Select
          className={classes.selectStyle}
          fullWidth={true}
          value={stockclass}
          onChange={handleChange}
        >
          {getstockclass?.data.map((item) => (
            <MenuItem value={item.classcode}>{item.classdesc}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
};
export default Filtertable;
