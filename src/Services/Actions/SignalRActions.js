import {
  GET_MESSAGES,
  GET_USERS,
  SELECTED_USER,
  MESSAGE_COMPOSE,
  NOTIFY_CALLING,
} from "../Types/SignalRType";
export const action_GET_users = (from) => async (dispatch) => {
  var url = `${process.env.REACT_APP_BASE_URL}api/messages/getusers`;
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      receiver: from,
    }),
  })
    .then((response) => response.json())
    .then((res) => {
      dispatch({
        type: GET_USERS,
        payload: res.data,
      });
    });
};
export const action_GET_messages = (from, to, offset) => async (dispatch) => {
  var url = `${process.env.REACT_APP_BASE_URL}api/messages/getmessages`;

  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      receiver: from,
      sender: to,
      offset: offset,
    }),
  })
    .then((response) => response.json())
    .then((res) => {
      dispatch({
        type: GET_MESSAGES,
        payload: res.data,
      });
    });
};
export const action_send_messages = (message, from, to) => async (dispatch) => {
  var url = `${process.env.REACT_APP_BASE_URL}api/messages/sendmessage`;
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: message,
      receiver: from,
      sender: to,
    }),
  })
    .then((response) => response.json())
    .then((res) => {});
};
export const action_send_signal = (data) => async (dispatch) => {
  var url = `${process.env.REACT_APP_BASE_URL}api/message`;
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: data.message,
      from: data.from,
      to: data.to,
    }),
  })
    .then((response) => response.json())
    .then((res) => {});
};
export const action_notify_signal = (data) => async () => {
  var url = `${process.env.REACT_APP_BASE_URL}api/inventory/notification`;
  await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      notification: data.notification,
      from: data.from,
      to: data.to,
      img: data.img,
    }),
  })
    .then((response) => response.json())
    .then(async (res) => {
      console.log(res);
    });
};
export const selectuser = (user) => async (dispatch) => {
  dispatch({
    type: SELECTED_USER,
    payload: user,
  });
};
export const composedmessaged = (message) => async (dispatch) => {
  dispatch({
    type: MESSAGE_COMPOSE,
    payload: message,
  });
};
export const notifycalling = (calling) => async (dispatch) => {
  dispatch({
    type: NOTIFY_CALLING,
    payload: calling,
  });
};
