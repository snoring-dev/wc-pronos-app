import { combineReducers } from "redux";
import { AuthReducer } from "./Auth/reducer";
import { AuthState } from "./Auth/types";
import { CommunityReducer } from "./community/reducer";
import { CommunityState } from "./community/types";
import { MatchesReducer } from "./Matchs/reducer";
import { MatchesState } from "./Matchs/types";
import { RegistrationReducer } from "./Registration/reducer";
import { RegistrationState } from "./Registration/types";
import { TournamentReducer } from "./Tournament/reducer";
import { TournamentState } from "./Tournament/types";
import { UserSelectionReducer } from "./UserSelection/reducer";
import { UserSelectionState } from "./UserSelection/types";

export interface ApplicationState {
  registration: RegistrationState;
  auth: AuthState;
  tournament: TournamentState;
  community: CommunityState;
  matches: MatchesState;
  userSelection: UserSelectionState;
}

export const getRootReducer = () =>
  combineReducers({
    registration: RegistrationReducer,
    auth: AuthReducer,
    tournament: TournamentReducer,
    community: CommunityReducer,
    matches: MatchesReducer,
    userSelection: UserSelectionReducer,
  });
