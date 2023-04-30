import {
  SET_SEARCH_TABLE_PER_ITEM,
  SET_SEARCH_FOR_TABLE,
  SET_STATUS_FOR_TABLE,
  SET_INVENTORY_TABLE_BYSTATUS,
  GET_DASHBOARD_NUMBERS,
  SET_REQ_FOOTER,
  GET_SINGLEREQUEST_HEADER,
  GET_SINGLEREQUEST_DETAILS,
  GET_REQUEST_INFO,
  REQUEST_SUCCESS,
  SET_INVENTORY_TABLE,
  GET_INVENTORY_DEPARTMENT,
  SET_OFFICE,
  SET_OPEN_MODAL,
  GET_NON_INVENTORY,
  SET_SELECTED_ITEM,
  SET_OPEN_QTYMODAL,
  SET_REQ_DTLS,
  SET_REQ_HEADER,
  SET_STOCK_CLASS,
  SET_SEARCH_FOR_STOCKCLASS,
} from "../Types/Inventory_Types";

const data = {
  data: { data: [], loading: false },
  databydept: { data: [], loading: false },
  noninventory: { data: [], loading: false },
  department: { data: [], loading: false },
  office: "",
  isOpen: false,
  QtyOpen: false,
  selected: [],
  requesteddtls: [],
  requestedheader: [],
  requestfooter: "",
  requestsuccess: { message: "", loading: false },
  requestinfo: { data: [], loading: false },
  singlerequestheader: { data: [], loading: false },
  singlerequestdetails: { data: [], loading: false },
  getdashboardnumbers: { data: [], loading: false },
  getstockclass: { data: [], loading: false },
  status: "",
  setsearchtable: { status: "", reqdate: "", apprdate: "", open: false },
  setsearchitem: { search: " " },
  setstockclasssearched: { classcode: " " },
};
const Inventory_Reducers = (data_state = data, actions) => {
  switch (actions.type) {
    case SET_SEARCH_FOR_STOCKCLASS:
      return { ...data_state, setstockclasssearched: actions.payload };
    case SET_SEARCH_TABLE_PER_ITEM:
      return { ...data_state, setsearchitem: actions.payload };
    case SET_STOCK_CLASS:
      return { ...data_state, getstockclass: actions.payload };
    case SET_SEARCH_FOR_TABLE:
      return { ...data_state, setsearchtable: actions.payload };
    case SET_STATUS_FOR_TABLE:
      return { ...data_state, status: actions.payload };
    case SET_INVENTORY_TABLE_BYSTATUS:
      return { ...data_state, databydept: actions.payload };
    case GET_DASHBOARD_NUMBERS:
      return { ...data_state, getdashboardnumbers: actions.payload };
    case SET_REQ_FOOTER:
      return { ...data_state, requestfooter: actions.payload };
    case GET_SINGLEREQUEST_HEADER:
      return { ...data_state, singlerequestheader: actions.payload };
    case GET_SINGLEREQUEST_DETAILS:
      return { ...data_state, singlerequestdetails: actions.payload };
    case GET_REQUEST_INFO:
      return { ...data_state, requestinfo: actions.payload };
    case REQUEST_SUCCESS:
      return { ...data_state, requestsuccess: actions.payload };
    case SET_REQ_HEADER:
      return { ...data_state, requestedheader: actions.payload };
    case SET_REQ_DTLS:
      return { ...data_state, requesteddtls: actions.payload };
    case SET_SELECTED_ITEM:
      return { ...data_state, selected: actions.payload };
    case SET_INVENTORY_TABLE:
      return { ...data_state, data: actions.payload };
    case GET_INVENTORY_DEPARTMENT:
      return { ...data_state, department: actions.payload };
    case GET_NON_INVENTORY:
      return { ...data_state, noninventory: actions.payload };
    case SET_OFFICE:
      return { ...data_state, office: actions.payload };
    case SET_OPEN_MODAL:
      return { ...data_state, isOpen: actions.payload };
    case SET_OPEN_QTYMODAL:
      return { ...data_state, QtyOpen: actions.payload };
    default:
      return data_state;
  }
};
export default Inventory_Reducers;
