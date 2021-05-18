import { ADD_NOTIFICATIONS } from "../Types/NotificationTypes";

const defaults = {
  notification_details: { title: "", body: "", priority: "", audience: "" },
};
const NotificationReducers = (data_state = defaults, actions) => {
  switch (actions.type) {
    case ADD_NOTIFICATIONS:
      return { ...data_state, notification_details: actions.payload };
    default:
      return data_state;
  }
};
export default NotificationReducers;
