import UsersReducers from "./Users_Reducers";
import DefaultReducers from "./Defaults_Reducers";
import LoginReducers from "./Login_Reducers";
import RFQ_Reducers from "./RFQ_Reducers";
import PurchaseRequest_Reducers from "./PurchaseRequest_Reducers";
import Inventory_Reducers from "./Inventory_Reducers";
import SignalRReducers from "./SignalRReducers";
import NotificationReducers from "./NotificationReducers";
import { combineReducers } from "redux";

const Root_Reducer = combineReducers({
  UsersReducers: UsersReducers,
  LoginReducers: LoginReducers,
  DefaultReducers: DefaultReducers,
  RFQ_Reducers: RFQ_Reducers,
  Inventory_Reducers:Inventory_Reducers,
  SignalRReducers:SignalRReducers,
  PurchaseRequest_Reducers: PurchaseRequest_Reducers,
  NotificationReducers:NotificationReducers
});
export default Root_Reducer;
