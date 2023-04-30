import React, { useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { Container, Grid, Paper } from "@material-ui/core";
import GRheader from "./GRheader";
import GRtable from "./GRtable";
import useStyles from "./style";
import {
  action_GET_listofdepartment,
  action_GET_noninventoryitem,
  action_GET_getsinglerequestheader,
  action_GET_getsinglerequestdetails,
  action_GET_listofstockclass,
} from "../../Services/Actions/Inventory_Actions";
import Inventorytable from "./Inventorytable";
import { useDispatch, useSelector } from "react-redux";
import SimpleSnackbar from "../../Plugin/SimpleSnackbar";
import { set_sncakbar,action_set_open_backdrop } from "../../Services/Actions/Defaults_Actions";
import SimpleBackDrop from "../../Plugin/SimpleBackDrop"
const GoodsRequest = () => {
  const snackbar = useSelector((state) => state.DefaultReducers.snackbar);
  const isOpen = useSelector((state) => state.Inventory_Reducers.isOpen);
  const requestinfo = useSelector(
    (state) => state.Inventory_Reducers.requestinfo
  );
  const openbackdrop = useSelector(
    (state) => state.DefaultReducers.openbackdrop
  );
  const searchitem = useSelector(
    (state) => state.Inventory_Reducers.setsearchitem
  );
  const setstockclasssearched = useSelector(
    (state) => state.Inventory_Reducers.setstockclasssearched
  );
  const classes = useStyles();
  const dispatch = useDispatch();
  console.log(requestinfo?.data);
  useEffect(() => {
    let mounted = true;
    const index = () => {
      if (mounted) {
        dispatch(action_GET_listofdepartment());
        dispatch(action_GET_listofstockclass());
      }
    };
    mounted && index();
  }, [dispatch, isOpen]);
  useEffect(() => {
    let mounted = true;
    const index = () => {
      if (mounted) {
        dispatch(
          action_GET_noninventoryitem(
            searchitem?.search,
            setstockclasssearched?.classcode
          )
        );
      }
    };
    mounted && index();
  }, [dispatch, searchitem?.search, setstockclasssearched?.classcode]);
  const handleClose = useCallback(() => {
    dispatch(set_sncakbar(false, "", ""));
  }, [dispatch]);
  useEffect(() => {
    let mounted = true;
    const checkifrequestshow = async () => {
      if (mounted) {
        if (requestinfo?.loading && requestinfo?.data?.reqno !== undefined) {
          dispatch(action_GET_getsinglerequestheader(requestinfo?.data?.reqno));
          dispatch(
            action_GET_getsinglerequestdetails(requestinfo?.data?.reqno)
          );
       
       
        }
        setTimeout(() => {
          dispatch(action_set_open_backdrop("Loading",false))
        }, 5000);
      }
    };
    mounted && checkifrequestshow();
    return () => {
      mounted = false;
    };
  }, [dispatch, requestinfo]);
    console.log(openbackdrop)
  return (
    <Container fixed>
      <SimpleBackDrop message={openbackdrop?.message} open={openbackdrop?.openbackdrop} />
      <SimpleSnackbar
        vertical="bottom"
        horizontal="left"
        open={snackbar.open}
        close={false}
        handleClose={() => handleClose()}
        message={snackbar.message}
        typeofmessage={snackbar.type}
      />

      <div className={classes.root}>
        <Paper className={classes.mainpaper}>
          <GRheader />
          <GRtable />
        </Paper>
      </div>
    </Container>
  );
};

GoodsRequest.propTypes = {};

export default GoodsRequest;
