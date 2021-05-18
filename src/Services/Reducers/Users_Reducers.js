import { SET_DATA, SET_DETAILS } from "../Types/Users_types";

const users = {
  data: [],
  details: [],
  loading: true,
  open: true,
};

const UsersReducers = (data_state = users, actions) => {
  switch (actions.type) {
    case SET_DATA:
      return {
        ...data_state,
        data: actions.payload,
        loading: true,
      };
    case SET_DETAILS:
      return { ...data_state, details: actions.payload, loading: true };

    default:
      return data_state;
  }
};
export default UsersReducers;
