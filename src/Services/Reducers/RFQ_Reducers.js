import {
  SET_DATA,
  SET_DATE_SOB,
  GET_RFQ_DETAILS,
  GET_SUPPLIER_LIST,
  GET_SUPPLIER_LIST_BYITEM,
  SET_NEW_SUPPLIER,
} from "../Types/RFQ_types";

const rfq = {
  data: [],
  data_sob: [],
  data_rfq_details: [],
  data_rfq_supplier_list: [],
  data_rfq_supplier_list_byitem: [],
  add_supplier: [],
  loading: false,
};
const RFQ_Reducers = (data_state = rfq, actions) => {
  switch (actions.type) {
    case SET_DATA:
      return { ...data_state, data: actions.payload };
    case SET_DATE_SOB:
      return { ...data_state, data_sob: actions.payload };
    case GET_RFQ_DETAILS:
      return { ...data_state, data_rfq_details: actions.payload };
    case GET_SUPPLIER_LIST:
      return { ...data_state, data_rfq_supplier_list: actions.payload };
    case GET_SUPPLIER_LIST_BYITEM:
      return { ...data_state, data_rfq_supplier_list_byitem: actions.payload };
    case SET_NEW_SUPPLIER:
      return { ...data_state, add_supplier: actions.payload };
    default:
      return data_state;
  }
};
export default RFQ_Reducers;
