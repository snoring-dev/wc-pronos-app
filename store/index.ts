import { combineReducers } from "redux";
import { AuthReducer } from "./Auth/reducer";
import { AuthState } from "./Auth/types";
import { RegistrationReducer } from "./Registration/reducer";
import { RegistrationState } from "./Registration/types";
import { TournamentReducer } from "./Tournament/reducer";
import { TournamentState } from "./Tournament/types";

export interface ApplicationState {
  registration: RegistrationState;
  auth: AuthState;
  tournament: TournamentState;
}

export const getRootReducer = () => combineReducers({
    registration: RegistrationReducer,
    auth: AuthReducer,
    tournament: TournamentReducer,
});