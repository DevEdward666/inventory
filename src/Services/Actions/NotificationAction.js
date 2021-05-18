import { ADD_NOTIFICATIONS } from "../Types/NotificationTypes";

export const action_set_notification_details = (
  title,
  body,
  priority,
  audience
) => async (dispatch) => {
  dispatch({
    type: ADD_NOTIFICATIONS,
    payload: {
      title: title,
      body: body,
      priority: priority,
      audience: audience,
    },
  });
};


export const action_SET_notications = (
    title,
    body,
    priority,
    audience,
    created_by
  ) => async (dispatch) => {
    var url = `${process.env.REACT_APP_BASE_URL}api/default/insertNotifications`;
    await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        body: body,
        priority: priority,
        audience: audience,
        created_by: created_by,
      }),
    })
      .then((response) => response.json())
      .then((res) => {});
  };