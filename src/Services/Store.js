import Root_Reducers from "./Reducers/Root_Reducers";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";

const store = createStore(Root_Reducers, applyMiddleware(thunk));

export default store;
