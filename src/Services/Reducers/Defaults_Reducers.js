import {
  SET_LOGO,
  SET_NAME,
  SET_USER_INFO,
  SET_INCHARGE,
  SET_MOP,
  GET_SUPPLIERS,
  GET_DEFAULTS,
  SIGNALR_CONNECT_NOTIFY,
  SET_SNACKBAR,
  SET_GLOBAL_SNACKBAR,
  GET_NOTIFICATION_LIST,
  GET_NOTIFICATION_LIST_BYDEPT,
  SET_USER_PERMISSION,
  SET_USER_PERMISSION_CANCEL,
  SET_PERMISSIONS,
} from "../Types/Default_Types";
import { SET_NEW_SUPPLIER } from "../Types/RFQ_types";

const defaults = {
  name: [],
  logo: [],
  incharge: [],
  mop: [],
  user_info: {},
  user_permission: [],
  user_permission_cancel: [],
  suppliers: [],
  defaults: [],
  hubconnectnotify: "",
  loading: false,
  snackbar: { open: false, message: "", type: "" },
  globalsnackbar: { open: false, message: "", type: "" },
  notificationlist: { data: [], loading: false },
  notificationlistbydept: { data: [], loading: false },
  permissions: { approve: false, cancel: false },
};
const DefaultReducers = (data_state = defaults, actions) => {
  switch (actions.type) {
    case SET_GLOBAL_SNACKBAR:
      return { ...data_state, globalsnackbar: actions.payload };
    case SET_PERMISSIONS:
      return { ...data_state, permissions: actions.payload };
    case GET_NOTIFICATION_LIST:
      return { ...data_state, notificationlist: actions.payload };
    case GET_NOTIFICATION_LIST_BYDEPT:
      return { ...data_state, notificationlistbydept: actions.payload };
    case SET_SNACKBAR:
      return { ...data_state, snackbar: actions.payload };
    case SET_LOGO:
      return { ...data_state, logo: actions.payload };
    case SET_NAME:
      return { ...data_state, name: actions.payload };
    case SET_INCHARGE:
      return { ...data_state, incharge: actions.payload };
    case SET_MOP:
      return { ...data_state, mop: actions.payload };
    case SET_USER_INFO:
      return { ...data_state, user_info: actions.payload };

    case SET_USER_PERMISSION:
      return { ...data_state, user_permission: actions.payload };
    case SET_USER_PERMISSION_CANCEL:
      return { ...data_state, user_permission_cancel: actions.payload };

    case GET_SUPPLIERS:
      return { ...data_state, suppliers: actions.payload };
    case GET_DEFAULTS:
      return { ...data_state, defaults: actions.payload };
    case SIGNALR_CONNECT_NOTIFY:
      return { ...data_state, hubconnectnotify: actions.payload };

    default:
      return data_state;
  }
};
export default DefaultReducers;
