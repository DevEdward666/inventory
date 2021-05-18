import { Container, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { action_INSERT_notications,action_GET_notications } from "../../Services/Actions/Defaults_Actions";
import {action_set_notification} from '../../Services/Actions/Inventory_Actions';
import { action_set_notification_details } from "../../Services/Actions/NotificationAction";
import Form from "./Form/Form";
import useStyles from "./indesstyle";
import Listofnotification from "./List/Listofnotification";

const ManageNotification = () => {
  const dispatch = useDispatch();
  const [offset, setoffset] = useState(50);
  const [prio, setprio] = useState("");
  const [title, settitle] = useState("");
  const notificationList = useSelector(
    (state) => state.DefaultReducers.notificationlist
  );
  const notification_details = useSelector(
    (state) => state.NotificationReducers.notification_details
  );
  const from = window.localStorage.getItem("username");
  const classes = useStyles();
//   useEffect(() => {
//     let mounted = true;
//     const index = () => {
//       dispatch(action_get_users());
//     };
//     mounted && index();
//     return () => (mounted = false);
//   }, [dispatch]);
  useEffect(() => {
    let mounted = true;
    const index = async () => {
      if (notificationList?.loading) {
        dispatch(action_GET_notications(title, prio, offset));
      }
      await dispatch(action_GET_notications(title, prio, offset));
    };
    mounted && index();
    return () => (mounted = false);
  }, [
    dispatch,
    notificationList?.loading,
    offset,
    prio,
    title,
    notification_details?.audience,
  ]);

  useEffect(() => {
    let mounted = true;
    const insertNotif = async() => {
        if(mounted){
            if( notification_details?.title!==""){
                  dispatch(action_set_notification(true, notification_details?.body,notification_details?.priority,"System","all"))
        
                dispatch(
                    action_INSERT_notications(
                    notification_details?.title,
                    notification_details?.body,
                    notification_details?.priority,
                    notification_details?.audience,
                    "System Admin"
                  )
                );
          
                dispatch(action_set_notification_details("", "", "", ""));
                  dispatch(action_GET_notications(title, prio, offset));
              }
             
        }
     
    };
    mounted && insertNotif();
    return () => {mounted = false};
  }, [dispatch, notification_details?.audience, notification_details?.body, notification_details?.priority, notification_details?.title, offset, prio, title]);
 
  return (
      <Grid container spacing={3}>
        <Grid item xs={6}>
          Notification List
          <Listofnotification />
        </Grid>
        <Grid item xs={4}>
          <Form />
        </Grid>
      </Grid>
  );
};

export default ManageNotification;
