import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Avatar,
  Backdrop,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  Typography,
  ListItemText,
  TextField,
} from "@material-ui/core";

import { useDispatch, useSelector } from "react-redux";
import UseStyles from "../indesstyle";
import CustomList from "../../../Plugin/List/CustomList";
const Listofnotification = () => {
  const dispatch = useDispatch();
  const [offset,setoffset]=useState(0)
  const classes = UseStyles();
  const notificationList = useSelector(
    (state) => state.DefaultReducers.notificationlist
  );


  return (
    <>
    <CustomList list={notificationList?.data}/>
     
    </>
  );
};

export default Listofnotification;
