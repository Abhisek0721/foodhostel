import userAddressReducer from "./userAddressReducer";
import userTokenReducer from "./userTokenReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  userAddressReducer,
  userTokenReducer
});

export default rootReducer;