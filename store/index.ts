import { combineReducers } from "redux";
import { AuthReducer } from "./Auth/reducer";
import { AuthState } from "./Auth/types";
import { CommunityReducer } from "./community/reducer";
import { CommunityState } from "./community/types";
import { RegistrationReducer } from "./Registration/reducer";
import { RegistrationState } from "./Registration/types";
import { TournamentReducer } from "./Tournament/reducer";
import { TournamentState } from "./Tournament/types";

export interface ApplicationState {
  registration: RegistrationState;
  auth: AuthState;
  tournament: TournamentState;
  community: CommunityState;
}

export const getRootReducer = () => combineReducers({
    registration: RegistrationReducer,
    auth: AuthReducer,
    tournament: TournamentReducer,
    community: CommunityReducer,
});