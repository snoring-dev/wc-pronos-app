import { Community } from "../community/types";
import { Match } from "../Matchs/types";


export interface UserSelectionState {
  match?: Match;
  community?: Community;
  isLoading?: boolean;
}

export enum UserSelectionTypes {
  SET_SELECTED_MATCH = "@wc-app/user-select/SET_SELECTED_MATCH",
  SET_SELECTED_COMMUNITY = "@wc-app/user-select/SET_SELECTED_COMMUNITY",
  SET_SELECTION_LOADING = "@wc-app/user-select/SET_SELECTION_LOADING",
}
