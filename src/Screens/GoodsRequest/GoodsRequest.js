import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container, Grid, Paper } from '@material-ui/core';
import GRheader from './GRheader'
import GRtable from './GRtable'
import useStyles from './style'
import {action_GET_listofdepartment,action_GET_noninventoryitem,action_GET_getsinglerequestheader,action_GET_getsinglerequestdetails} from '../../Services/Actions/Inventory_Actions'
import Inventorytable from './Inventorytable'
import { useDispatch,useSelector } from 'react-redux';
import SimpleSnackbar from '../../Plugin/SimpleSnackbar'
import {set_sncakbar} from '../../Services/Actions/Defaults_Actions'

const GoodsRequest = () => {
    const snackbar = useSelector((state) => state.DefaultReducers.snackbar);
    const isOpen = useSelector((state) => state.Inventory_Reducers.isOpen);
    const requestinfo = useSelector((state) => state.Inventory_Reducers.requestinfo);
    const classes = useStyles();
    const dispatch=useDispatch()
   useEffect(()=>{
    let mounted=true
    const index =()=>{
        if(mounted){
        dispatch(action_GET_listofdepartment())
        dispatch(action_GET_noninventoryitem())
        }
    }
    mounted && index()
   },[dispatch,isOpen])
   const handleClose=useCallback(()=>{
    dispatch(set_sncakbar(false,"",""))
   },[dispatch])
   useEffect(()=>{
    let mounted=true
    const checkifrequestshow=async()=>{
      if (mounted){
       if(requestinfo?.loading && requestinfo?.data?.reqno!==undefined){
          dispatch(action_GET_getsinglerequestheader(requestinfo?.data?.reqno))
          dispatch(action_GET_getsinglerequestdetails(requestinfo?.data?.reqno))
          
       }
    }
  }
  mounted && checkifrequestshow();
  return()=>{mounted=false}
  },[dispatch, requestinfo])
    return (
        <Container fixed>
         <SimpleSnackbar
         vertical="bottom"
         horizontal="left"
          open={snackbar.open}
          close={false}
          handleClose={()=>handleClose()}
          message={snackbar.message}
          typeofmessage={snackbar.type}
        />
     
        <div className={classes.root}>
    <Paper className={classes.mainpaper}>
        <GRheader/>
        <GRtable/>
        </Paper>
        </div>
        </Container>
    );
};

GoodsRequest.propTypes = {
    
};

export default GoodsRequest;