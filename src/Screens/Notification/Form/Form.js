import React, { useCallback, useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Divider,
  Grid,
  NativeSelect,
  TextField,
  Typography,
} from "@material-ui/core";
import { action_set_notification_details } from "../../../Services/Actions/NotificationAction";
import { useDispatch, useSelector } from "react-redux";
import UseStyles from "../indesstyle";
const Form = () => {
  const dispatch = useDispatch();
  const classes = UseStyles();
  const [title, settitle] = useState("");
  const [body, setbody] = useState("");
  const [priority, setpriority] = useState("");
  const [audience, setaudience] = useState("");
  const [user_audience, setuser_audience] = useState("");
  const [visible, setvisible] = useState(false);
  const userlist = useSelector((state) => state.UsersReducers.data);
  const handleSendNotification = useCallback(async () => {
    await dispatch(
      action_set_notification_details(title, body, priority, "all")
    );
  }, [body, dispatch, priority, title]);
  const handlePriority = useCallback((value) => {
    setpriority(value.target.value);
  }, []);
  const handleAudience = useCallback((value) => {
    setuser_audience(value.target.value);
  }, []);
  const handleSelectedAudience = useCallback((value) => {
    console.log(value.target.value);
    if (value.target.value === "all") {
      setaudience(value.target.value);
      setuser_audience(value.target.value);
      setvisible(false);
    } else {
      setaudience(value.target.value);
      setvisible(true);
    }
  }, []);
  return (
    <Grid container spacing={3}>
      <Typography
        component="span"
        variant="h6"
        className={classes.inline}
        color="textPrimary"
      >
        Create Push Notification
      </Typography>
      <Grid item xs={12}>
        <TextField
          id="standard-read-only-input"
          label="Title"
          value={title}
          onChange={(e) => settitle(e.target.value)}
          fullWidth={true}
          InputProps={{
            classes: {
              input: classes.multilineColor,
            },
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="standard-read-only-input"
          label="Body"
          value={body}
          multiline={true}
          rows={5}
          rowsMax={255}
          onChange={(e) => setbody(e.target.value)}
          fullWidth={true}
          InputProps={{
            classes: {
              input: classes.multilineColor,
            },
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <NativeSelect
          fullWidth={true}
          value={priority}
          onChange={(itemValue, itemIndex) => handlePriority(itemValue)}
          inputProps={{
            name: "Priority",
            id: "age-native-label-placeholder",
          }}
        >
          <option key={0} value="">
            Select Priority
          </option>
          <option key={1} value="info">
            Low
          </option>
          <option key={2} value="warning">
            Medium
          </option>
          <option key={3} value="error">
            High Priority
          </option>
        </NativeSelect>
      </Grid>

      {/* <Grid item xs={12}>
        <NativeSelect
          fullWidth={true}
          value={audience}
          onChange={(itemValue, itemIndex) => handleSelectedAudience(itemValue)}
          inputProps={{
            name: "Audience",
            id: "age-native-label-placeholder",
          }}
        >
          <option key={0} value="">
            Select Audience
          </option>
          <option key={1} value="all">
            All
          </option>
          <option key={2} value="set_user">
            Set users
          </option>
        </NativeSelect>
      </Grid>
      {visible ? (
        <Grid item xs={12}>
          <NativeSelect
            fullWidth={true}
            value={user_audience}
            onChange={(itemValue, itemIndex) => handleAudience(itemValue)}
            inputProps={{
              name: "Priority",
              id: "age-native-label-placeholder",
            }}
          >
            <option key={0} value="">
              Select User
            </option>
            {userlist.map((item) => (
              <option key={0} value={item?.prem_id}>
                {item?.firstname + " " + item?.lastname}
              </option>
            ))}
          </NativeSelect>
        </Grid>
      ) : null} */}
      <Grid item xs={12} style={{ alignContent: "center" }}>
        <Grid container spacing={3}>
          <Divider />
          <Grid item xs={12}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleSendNotification()}
            >
              Send Notification
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

Form.propTypes = {};

export default Form;
