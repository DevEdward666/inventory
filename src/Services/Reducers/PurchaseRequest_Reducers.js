import {
  SET_DATA,
  SET_DATA_OTHERS_DEPT,
  SET_PRTYPE,
  SET_NONPR_ITEMS,
  SET_PR_ITEMS,
  SET_DEPARTMENTS,
  SET_SOURCE_PPMP_LIST,
  SET_CURRENT_QTY_ITEMS,
  GET_PPMP_ALREADY_REQUESTED_BUDGET,
  GET_PPMP_TOTAL_BUDGET,
  GET_PR_NO,
  GET_PR_DETAILS,
  SET_CANCELLED,
  SET_APPROVED,
  SET_RECEIVED,
  GET_PR_DETAILS_QTY_CHILD,
} from "../Types/PurchaseRequest_Types";

const PurchaseRequest = {
  data: [],
  departments: [],
  prtype: [],
  data_others_dept: [],
  data_pr_items: [],
  data_nonpr_items: [],
  data_current_qty_items: [],
  data_source_ppmp_list: [],
  data_ppmp_already_requested_budget: [],
  data_ppmp_total_budget: [],
  data_pr_no: "",
  data_pr_details: [],
  data_child_qty_pr: [],
  approved: true,
  received: true,
  cancelled: true,
  loading: false,
};
const PurchaseRequest_Reducers = (data_state = PurchaseRequest, actions) => {
  switch (actions.type) {
    case SET_DATA:
      return { ...data_state, data: actions.payload };
    case SET_DEPARTMENTS:
      return { ...data_state, departments: actions.payload };
    case SET_PRTYPE:
      return { ...data_state, prtype: actions.payload };
    case SET_NONPR_ITEMS:
      return { ...data_state, data_nonpr_items: actions.payload };
    case SET_PR_ITEMS:
      return { ...data_state, data_pr_items: actions.payload };
    case SET_DATA_OTHERS_DEPT:
      return { ...data_state, data_others_dept: actions.payload };
    case SET_SOURCE_PPMP_LIST:
      return { ...data_state, data_source_ppmp_list: actions.payload };
    case SET_CURRENT_QTY_ITEMS:
      return { ...data_state, data_current_qty_items: actions.payload };
    case GET_PR_NO:
      return { ...data_state, data_pr_no: actions.payload };
    case GET_PPMP_ALREADY_REQUESTED_BUDGET:
      return {
        ...data_state,
        data_ppmp_already_requested_budget: actions.payload,
      };
    case GET_PPMP_TOTAL_BUDGET:
      return { ...data_state, data_ppmp_total_budget: actions.payload };
    case GET_PR_DETAILS:
      return { ...data_state, data_pr_details: actions.payload };
    case GET_PR_DETAILS_QTY_CHILD:
      return { ...data_state, data_child_qty_pr: actions.payload };

    case SET_RECEIVED:
      return { ...data_state, received: actions.payload };

    case SET_APPROVED:
      return { ...data_state, approved: actions.payload };

    case SET_CANCELLED:
      return { ...data_state, cancelled: actions.payload };

    default:
      return data_state;
  }
};
export default PurchaseRequest_Reducers;
