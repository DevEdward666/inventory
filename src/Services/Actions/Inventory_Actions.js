import { SET_GLOBAL_SNACKBAR } from "../Types/Default_Types";
import {
  SET_INVENTORY_TABLE_BYSTATUS,
  REQUEST_SUCCESS,
  SET_INVENTORY_TABLE,
  GET_INVENTORY_DEPARTMENT,
  SET_OFFICE,
  SET_OPEN_MODAL,
  GET_NON_INVENTORY,
  SET_SELECTED_ITEM,
  SET_OPEN_QTYMODAL,
  SET_REQ_HEADER,
  SET_REQ_DTLS,
  GET_REQUEST_INFO,
  GET_SINGLEREQUEST_HEADER,
  GET_SINGLEREQUEST_DETAILS,
  SET_REQ_FOOTER,
  GET_DASHBOARD_NUMBERS,
  SET_STATUS_FOR_TABLE,
  SET_SEARCH_FOR_TABLE,
  SET_SEARCH_TABLE_PER_ITEM,
  SET_STOCK_CLASS,
  SET_SEARCH_FOR_STOCKCLASS,
} from "../Types/Inventory_Types";

const auth = window.localStorage.getItem("inventory_token");
const bearer_token = auth;
const bearer = "Bearer " + bearer_token;
export const action_GET_listofrequest_by_status =
  (todept, status) => async (dispatch) => {
    var url = `${process.env.REACT_APP_BASE_URL}api/inventory/getlistofrequestbystatus`;
    await fetch(url, {
      method: "POST",
      withCredentials: true,
      headers: {
        Authorization: bearer,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: todept,
        status: status,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        dispatch({
          type: SET_INVENTORY_TABLE_BYSTATUS,
          payload: { data: res.data, loading: true },
        });
        console.log(res);
      });
  };
export const action_GET_listofrequestsearched =
  (todept, status, date) => async (dispatch) => {
    var url = `${process.env.REACT_APP_BASE_URL}api/inventory/getlistofrequestsearched`;
    await fetch(url, {
      method: "POST",
      withCredentials: true,
      headers: {
        Authorization: bearer,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        dept: todept,
        status: status,
        date: date,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        dispatch({
          type: SET_INVENTORY_TABLE,
          payload: { data: res.data, loading: true },
        });
      });
  };
export const action_GET_listofrequest = (todept) => async (dispatch) => {
  var url = `${process.env.REACT_APP_BASE_URL}api/inventory/getlistofrequest`;
  await fetch(url, {
    method: "POST",
    withCredentials: true,
    headers: {
      Authorization: bearer,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: todept,
    }),
  })
    .then((response) => response.json())
    .then((res) => {
      dispatch({
        type: SET_INVENTORY_TABLE,
        payload: { data: res.data, loading: true },
      });
    });
};
export const action_GET_listofdepartment = () => async (dispatch) => {
  var url = `${process.env.REACT_APP_BASE_URL}api/inventory/getdepartmentList`;
  await fetch(url, {
    method: "POST",
    withCredentials: true,
    headers: {
      Authorization: bearer,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((res) => {
      dispatch({
        type: GET_INVENTORY_DEPARTMENT,
        payload: { data: res.data, loading: true },
      });
    });
};
export const action_GET_listofstockclass = () => async (dispatch) => {
  var url = `${process.env.REACT_APP_BASE_URL}api/inventory/getstockclass`;
  await fetch(url, {
    method: "POST",
    withCredentials: true,
    headers: {
      Authorization: bearer,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((res) => {
      dispatch({
        type: SET_STOCK_CLASS,
        payload: { data: res.data, loading: true },
      });
    });
};
export const action_GET_noninventoryitem =
  (search, classcode) => async (dispatch) => {
    var url = `${process.env.REACT_APP_BASE_URL}api/inventory/getinventoryitem`;
    await fetch(url, {
      method: "POST",
      withCredentials: true,
      headers: {
        Authorization: bearer,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        search: search,
        classcode: classcode,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        dispatch({
          type: GET_NON_INVENTORY,
          payload: { data: res.data, loading: true },
        });
      });
  };
export const action_GET_InsertNewRequest =
  (deptcode, reqby, todept, reqremarks, requestdetails) => async (dispatch) => {
    var url = `${process.env.REACT_APP_BASE_URL}api/inventory/InsertNewRequest`;
    await fetch(url, {
      method: "POST",
      withCredentials: true,
      headers: {
        Authorization: bearer,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        deptcode: deptcode,
        reqby: reqby,
        todept: todept,
        reqremarks: reqremarks,
        lisrequesttdtls: requestdetails,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        dispatch({
          type: REQUEST_SUCCESS,
          payload: { message: res.message, loading: res.success },
        });
        console.log(res);
      });
  };
export const action_GET_getsinglerequestheader =
  (reqno) => async (dispatch) => {
    var url = `${process.env.REACT_APP_BASE_URL}api/inventory/getsinglerequestheader`;
    await fetch(url, {
      method: "POST",
      withCredentials: true,
      headers: {
        Authorization: bearer,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reqno: reqno,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        dispatch({
          type: GET_SINGLEREQUEST_HEADER,
          payload: { data: res.data, loading: true },
        });
        console.log(res);
      });
  };
export const action_GET_getsinglerequestdetails =
  (reqno) => async (dispatch) => {
    var url = `${process.env.REACT_APP_BASE_URL}api/inventory/getsinglerequestdtls`;
    await fetch(url, {
      method: "POST",
      withCredentials: true,
      headers: {
        Authorization: bearer,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reqno: reqno,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        dispatch({
          type: GET_SINGLEREQUEST_DETAILS,
          payload: { data: res.data, loading: true },
        });
      });
  };

export const action_SET_updaterequestApproved =
  (reqno, apprbycode, apprbyname) => async (dispatch) => {
    var url = `${process.env.REACT_APP_BASE_URL}api/inventory/updaterequestApproved`;
    await fetch(url, {
      method: "POST",
      withCredentials: true,
      headers: {
        Authorization: bearer,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reqno: reqno,
        apprbycode: apprbycode,
        apprbyname: apprbyname,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        dispatch({
          type: REQUEST_SUCCESS,
          payload: { message: res.message, loading: true },
        });
        console.log(res);
      });
  };

export const action_SET_updaterequestCancelled =
  (reqno, cancelledbycode, cancelledbyname) => async (dispatch) => {
    var url = `${process.env.REACT_APP_BASE_URL}api/inventory/updaterequestCancelled`;
    await fetch(url, {
      method: "POST",
      withCredentials: true,
      headers: {
        Authorization: bearer,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reqno: reqno,
        cancelledbycode: cancelledbycode,
        cancelledbyname: cancelledbyname,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        dispatch({
          type: REQUEST_SUCCESS,
          payload: { message: res.message, loading: true },
        });
        console.log(res);
      });
  };

export const action_GET_dashboardnumber = (id) => async (dispatch) => {
  var url = `${process.env.REACT_APP_BASE_URL}api/inventory/dashboardnumbers`;
  await fetch(url, {
    method: "POST",
    withCredentials: true,
    headers: {
      Authorization: bearer,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
    }),
  })
    .then((response) => response.json())
    .then((res) => {
      dispatch({
        type: GET_DASHBOARD_NUMBERS,
        payload: { data: res.data, loading: true },
      });
    });
};

export const action_set_notification =
  (open, message, type, from, to) => async (dispatch) => {
    var url = `${process.env.REACT_APP_BASE_URL}api/inventory/notification`;
    await fetch(url, {
      method: "POST",
      withCredentials: true,
      headers: {
        Authorization: bearer,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        notification: message,
        from: from,
        to: to,
        type: type,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        dispatch({
          type: SET_GLOBAL_SNACKBAR,
          payload: { open: open, message: message, type: type },
        });
        console.log(res);
      });
  };
export const action_set_stockclass_search = (code) => async (dispatch) => {
  dispatch({
    type: SET_SEARCH_FOR_STOCKCLASS,
    payload: { classcode: code },
  });
};

export const action_set_search_item = (search) => async (dispatch) => {
  dispatch({
    type: SET_SEARCH_TABLE_PER_ITEM,
    payload: { search: search },
  });
};

export const action_set_search = (status, date, open) => async (dispatch) => {
  dispatch({
    type: SET_SEARCH_FOR_TABLE,
    payload: { status: status, date: date, open: open },
  });
};
export const action_get_request_info = (row) => async (dispatch) => {
  dispatch({
    type: GET_REQUEST_INFO,
    payload: { data: row, loading: true },
  });
};
export const action_close_success_modal = () => async (dispatch) => {
  dispatch({
    type: REQUEST_SUCCESS,
    payload: { message: "", loading: false },
  });
};

export const action_set_office = (office) => async (dispatch) => {
  dispatch({
    type: SET_OFFICE,
    payload: office,
  });
};
export const action_set_openmodal = (open) => async (dispatch) => {
  dispatch({
    type: SET_OPEN_MODAL,
    payload: open,
  });
};
export const action_set_qtyopenmodal = (open) => async (dispatch) => {
  dispatch({
    type: SET_OPEN_QTYMODAL,
    payload: open,
  });
};
export const action_set_status = (status) => async (dispatch) => {
  dispatch({
    type: SET_STATUS_FOR_TABLE,
    payload: status,
  });
};
export const action_set_selected_item = (selected) => async (dispatch) => {
  dispatch({
    type: SET_SELECTED_ITEM,
    payload: selected,
  });
  console.log(selected);
};
export const action_set_requestedheader = (header) => async (dispatch) => {
  dispatch({
    type: SET_REQ_HEADER,
    payload: header,
  });
};
export const action_set_requestedfooter = (reqremarks) => async (dispatch) => {
  dispatch({
    type: SET_REQ_FOOTER,
    payload: reqremarks,
  });
};
export const action_set_requesteddtls = (dtls) => async (dispatch) => {
  dispatch({
    type: SET_REQ_DTLS,
    payload: dtls,
  });
};
