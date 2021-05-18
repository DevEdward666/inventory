import {
  SET_DATA,
  SET_PRTYPE,
  SET_DATA_OTHERS_DEPT,
  SET_DEPARTMENTS,
  SET_PR_ITEMS,
  SET_SOURCE_PPMP_LIST,
  SET_CURRENT_QTY_ITEMS,
  GET_PPMP_ALREADY_REQUESTED_BUDGET,
  GET_PPMP_TOTAL_BUDGET,
  GET_PR_NO,
  GET_PR_DETAILS,
  SET_RECEIVED,
  SET_APPROVED,
  GET_PR_DETAILS_QTY_CHILD,
} from "../Types/PurchaseRequest_Types";
const auth = window.localStorage.getItem("tokenizer");
const bearer_token = auth;
const bearer = "Bearer " + bearer_token;
export const action_GET_prtable = (id, year) => async (dispatch) => {
  var url = `${process.env.REACT_APP_BASE_URL}api/pr/getprlisttable`;
  await fetch(url, {
    method: "POST",
    withCredentials: true,
    headers: {
      Authorization: bearer,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      year: year,
    }),
  })
    .then((response) => response.json())
    .then((res) => {
      dispatch({
        type: SET_DATA,
        payload: res.data,
      });
    });
};

export const action_GET_prtable_other_department = (year) => async (
  dispatch
) => {
  var url = `${process.env.REACT_APP_BASE_URL}api/pr/getprlisttable_other_department`;
  await fetch(url, {
    method: "POST",
    withCredentials: true,
    headers: {
      Authorization: bearer,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      year: year,
    }),
  })
    .then((response) => response.json())
    .then((res) => {
      dispatch({
        type: SET_DATA_OTHERS_DEPT,
        payload: res.data,
      });
    });
};

export const action_GET_department = (msbkey) => async (dispatch) => {
  var url = `${process.env.REACT_APP_BASE_URL}api/pr/departments`;
  await fetch(url, {
    method: "POST",
    withCredentials: true,
    headers: {
      Authorization: bearer,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      msbkey: msbkey,
    }),
  })
    .then((response) => response.json())
    .then((res) => {
      dispatch({
        type: SET_DEPARTMENTS,
        payload: res.data,
      });
    });
};

export const action_GET_prtype = () => async (dispatch) => {
  var url = `${process.env.REACT_APP_BASE_URL}api/pr/getprtype`;
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
        type: SET_PRTYPE,
        payload: res.data,
      });
    });
};

export const action_GET_pritems = (mop, department, office) => async (
  dispatch
) => {
  var url = `${process.env.REACT_APP_BASE_URL}api/pr/APPitems`;
  await fetch(url, {
    method: "POST",
    withCredentials: true,
    headers: {
      Authorization: bearer,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      mop: mop,
      department: department,
      office: office,
    }),
  })
    .then((response) => response.json())
    .then((res) => {
      dispatch({
        type: SET_PR_ITEMS,
        payload: res.data,
      });
    });
};

export const action_GET_nonpritems = (mop) => async (dispatch) => {
  var url = `${process.env.REACT_APP_BASE_URL}api/pr/NonAPPitems`;
  await fetch(url, {
    method: "POST",
    withCredentials: true,
    headers: {
      Authorization: bearer,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      mop: mop,
    }),
  })
    .then((response) => response.json())
    .then((res) => {
      dispatch({
        type: SET_PR_ITEMS,
        payload: res.data,
      });
    });
};

export const action_GET_totalitemqtyrequested = (
  stockcode,
  mop,
  msbdname
) => async (dispatch) => {
  var url = `${process.env.REACT_APP_BASE_URL}api/pr/totalitemqtyrequested`;
  await fetch(url, {
    method: "POST",
    withCredentials: true,
    headers: {
      Authorization: bearer,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      stockcode: stockcode,
      mop: mop,
      msbdname: msbdname,
    }),
  })
    .then((response) => response.json())
    .then((res) => {
      dispatch({
        type: SET_CURRENT_QTY_ITEMS,
        payload: res.data,
      });
    });
};

export const action_GET_SourcePPMPList = () => async (dispatch) => {
  var url = `${process.env.REACT_APP_BASE_URL}api/pr/SourcePPMPList`;
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
        type: SET_SOURCE_PPMP_LIST,
        payload: res.data,
      });
    });
};

export const action_POST_InsertNewPR = (
  prheader,
  arrayitem,
  childarrayitem
) => async (dispatch) => {
  var url = `${process.env.REACT_APP_BASE_URL}api/pr/insernewpr`;
  await fetch(url, {
    method: "POST",
    withCredentials: true,
    headers: {
      Authorization: bearer,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prheader: prheader,
      prdetails: arrayitem,
      prdetails_child: childarrayitem,
    }),
  })
    .then((response) => response.json())
    .then((res) => {
      dispatch({
        type: GET_PR_NO,
        payload: res.data,
      });
      console.log(res.data);
    });
};

export const action_GET_total_requested_ppmp = (
  sectioncode,
  sourcepr
) => async (dispatch) => {
  var url = `${process.env.REACT_APP_BASE_URL}api/pr/gettotalppmpbudgetrequested`;
  await fetch(url, {
    method: "POST",
    withCredentials: true,
    headers: {
      Authorization: bearer,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      section: sectioncode,
      sourcepr: sourcepr,
    }),
  })
    .then((response) => response.json())
    .then((res) => {
      dispatch({
        type: GET_PPMP_ALREADY_REQUESTED_BUDGET,
        payload: res.data,
      });
    });
};

export const action_GET_total_ppmp = (sectioncode, sourcepr) => async (
  dispatch
) => {
  var url = `${process.env.REACT_APP_BASE_URL}api/pr/gettotalbudgetppmpperdept`;
  await fetch(url, {
    method: "POST",
    withCredentials: true,
    headers: {
      Authorization: bearer,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      section: sectioncode,
      sourcepr: sourcepr,
    }),
  })
    .then((response) => response.json())
    .then((res) => {
      dispatch({
        type: GET_PPMP_TOTAL_BUDGET,
        payload: res.data,
      });
    });
};

export const action_GET_PR_Details = (prno) => async (dispatch) => {
  var url = `${process.env.REACT_APP_BASE_URL}api/pr/getprdetails`;
  await fetch(url, {
    method: "POST",
    withCredentials: true,
    headers: {
      Authorization: bearer,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prno: prno,
    }),
  })
    .then((response) => response.json())
    .then((res) => {
      dispatch({
        type: GET_PR_DETAILS,
        payload: res.data,
      });
    });
};

export const action_SET_updatepr = (
  prno,
  approvebycode,
  approvedbyname,
  approvedbyposition
) => async (dispatch) => {
  var url = `${process.env.REACT_APP_BASE_URL}api/pr/updateprapproved`;
  await fetch(url, {
    method: "POST",
    withCredentials: true,
    headers: {
      Authorization: bearer,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      approvedbycode: approvebycode,
      approvedbyname: approvedbyname,
      approvedbyposition: approvedbyposition,
      prno: prno,
    }),
  })
    .then((response) => response.json())
    .then((res) => {
      dispatch({
        type: SET_APPROVED,
        payload: res.success,
      });
      console.log(res.success);
    });
  // .then((response) => response.json())
  // .then((res) => {
  //   dispatch({
  //     type: GET_PR_DETAILS,
  //     payload: res.data,
  //   });
  // });
};
export const action_SET_updatereceivedpr = (rfqheader, rfqdetails) => async (
  dispatch
) => {
  var url = `${process.env.REACT_APP_BASE_URL}api/pr/insertnewrfq`;
  await fetch(url, {
    method: "POST",
    withCredentials: true,
    headers: {
      Authorization: bearer,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      rfqheader: rfqheader,
      rfqdetails: rfqdetails,
    }),
  })
    .then((response) => response.json())
    .then((res) => {
      dispatch({
        type: SET_RECEIVED,
        payload: res.success,
      });
      console.log(res);
    });
};
export const action_GET_getchildqtypr = (stockcode, prno) => async (
  dispatch
) => {
  var url = `${process.env.REACT_APP_BASE_URL}api/pr/getchildqtypr`;
  await fetch(url, {
    method: "POST",
    withCredentials: true,
    headers: {
      Authorization: bearer,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      stockcode: stockcode,
      prno: prno,
    }),
  })
    .then((response) => response.json())
    .then((res) => {
      dispatch({
        type: GET_PR_DETAILS_QTY_CHILD,
        payload: res.data,
      });
      console.log(res);
    });
};

export const action_export_pr = (prno, PRhub, total) => async (dispatch) => {
  var url = `http://192.168.254.104:45457/Home/ExportPR?prno=${prno}&office_name=${PRhub}&Report_Label=Purchase Request&checkppmpitems=Within PPMP&total=${total}`;
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
      console.log(res);
    });
};
