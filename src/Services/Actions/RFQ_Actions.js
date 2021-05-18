import {
  GET_RFQ_DETAILS,
  GET_SUPPLIER_LIST,
  SET_DATA,
  SET_DATE_SOB,
  GET_SUPPLIER_LIST_BYITEM,
  SET_NEW_SUPPLIER,
} from "../Types/RFQ_types";
const auth = localStorage.getItem("tokenizer");
const bearer_token = auth;
const bearer = "Bearer " + bearer_token;
export const action_GET_rfqtable = () => async (dispatch) => {
  var url = `${process.env.REACT_APP_BASE_URL}api/rfq/rfqtable`;
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
        type: SET_DATA,
        payload: res.data,
      });
    });
};

export const action_GET_rfqsob = (rfqno) => async (dispatch) => {
  const bearer_token = auth;
  const bearer = "Bearer " + bearer_token;
  var url = `${process.env.REACT_APP_BASE_URL}api/rfq/rfqsob`;
  await fetch(url, {
    method: "POST",
    withCredentials: true,
    headers: {
      Authorization: bearer,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      rfqno: rfqno,
    }),
  })
    .then((response) => response.json())
    .then((res) => {
      dispatch({
        type: SET_DATE_SOB,
        payload: res.data,
      });
    });
};

export const action_GET_rfq_details = (rfqno) => async (dispatch) => {
  const bearer_token = auth;
  const bearer = "Bearer " + bearer_token;
  var url = `${process.env.REACT_APP_BASE_URL}api/rfq/rfqdetails`;
  await fetch(url, {
    method: "POST",
    withCredentials: true,
    headers: {
      Authorization: bearer,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      rfqno: rfqno,
    }),
  })
    .then((response) => response.json())
    .then((res) => {
      dispatch({
        type: GET_RFQ_DETAILS,
        payload: res.data,
      });
    });
};

export const action_GET_rfq_suppliers = (rfqno) => async (dispatch) => {
  const bearer_token = auth;
  const bearer = "Bearer " + bearer_token;
  var url = `${process.env.REACT_APP_BASE_URL}api/rfq/getsupplierlistbyrfqnodefault`;
  await fetch(url, {
    method: "POST",
    withCredentials: true,
    headers: {
      Authorization: bearer,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      rfqno: rfqno,
    }),
  })
    .then((response) => response.json())
    .then((res) => {
      dispatch({
        type: GET_SUPPLIER_LIST,
        payload: res.data,
      });
    });
};

export const action_GET_rfq_suppliers_byitem = (rfqno, stockcode) => async (
  dispatch
) => {
  const bearer_token = auth;
  const bearer = "Bearer " + bearer_token;
  var url = `${process.env.REACT_APP_BASE_URL}api/rfq/getsupplierlistbyrfqnobyitem`;
  await fetch(url, {
    method: "POST",
    withCredentials: true,
    headers: {
      Authorization: bearer,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      rfqno: rfqno,
      stockcode: stockcode,
    }),
  })
    .then((response) => response.json())
    .then((res) => {
      dispatch({
        type: GET_SUPPLIER_LIST_BYITEM,
        payload: res.data,
      });
    });
};

export const action_SET_rfq_suppliers = (
  rfqno,
  suppliercode,
  suppliername,
  contactperson,
  supplieraddress,
  quotedate,
  deliveryleadtime,
  postedby
) => async (dispatch) => {
  const bearer_token = auth;
  const bearer = "Bearer " + bearer_token;
  var url = `${process.env.REACT_APP_BASE_URL}api/rfq/addsupplier`;
  await fetch(url, {
    method: "POST",
    withCredentials: true,
    headers: {
      Authorization: bearer,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      rfqno: rfqno,
      suppliercode: suppliercode,
      suppliername: suppliername,
      contactperson: contactperson,
      supplieraddress: supplieraddress,
      quotedate: quotedate,
      deliveryleadtime: deliveryleadtime,
      postedby: postedby,
    }),
  })
    .then((response) => response.json())
    .then((res) => {
      dispatch({
        type: SET_NEW_SUPPLIER,
        payload: res.success,
      });
    });
};

export const action_export_rfq = (
  rfqno,
  office_name,
  office_telephone,
  office_email,
  office_area,
  office_republic,
  office_address,
  supplier_code,
  deptsection,
  pr_no,
  rfq_lead_time,
  quotedate
) => async (dispatch) => {
  var url = `http://192.168.254.104:45457/Home/ExportrerenderRFQ?suppcode=${supplier_code}&rfqno=${rfqno}&office_name=${office_name}&office_telephone=${office_telephone}&office_email=${office_email}&office_area=${office_area}&office_republic=${office_republic}&office_address=${office_address}&Report_Label=Request For Quotation&deptsection=${deptsection}&pr_no=${pr_no}&rfq_lead_time=${rfq_lead_time}&quotedate=${quotedate}`;
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
