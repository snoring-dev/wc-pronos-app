import { combineReducers } from "redux";
import { AuthReducer } from "./Auth/reducer";
import { AuthState } from "./Auth/types";
import { RegistrationReducer } from "./Registration/reducer";
import { RegistrationState } from "./Registration/types";

export interface ApplicationState {
  registration: RegistrationState;
  auth: AuthState;
}

export const getRootReducer = () => combineReducers({
    registration: RegistrationReducer,
    auth: AuthReducer,
});