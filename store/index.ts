import { combineReducers } from "redux";
import { RegistrationReducer } from "./Registration/reducer";
import { RegistrationState } from "./Registration/types";

export interface ApplicationState {
  registration: RegistrationState;
}

export const getRootReducer = () => combineReducers({
    registration: RegistrationReducer,
});