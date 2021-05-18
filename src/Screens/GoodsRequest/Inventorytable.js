import React, { useCallback, useEffect,useState } from 'react';
import PropTypes from 'prop-types';
import { FormControl, Paper, TextField } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import useStyles from './style'
import { useDispatch, useSelector } from 'react-redux';
import {action_set_selected_item,action_set_openmodal} from '../../Services/Actions/Inventory_Actions'
const Inventorytable = props => {
    const classes = useStyles();
    const dispatch=useDispatch();
    const[arrayitem,setarrayitem]=useState([]);
    const noninventory = useSelector((state) => state.Inventory_Reducers.noninventory);
    
    useEffect(()=>{
        dispatch(action_set_selected_item(arrayitem))
    },[arrayitem, dispatch])
    console.log(arrayitem)
    return (
        <div>
           
        </div>
    );
};

Inventorytable.propTypes = {
    
};

export default Inventorytable;