import { Community } from "../community/types";
import { UserSelectionTypes } from "./types";

export const setSelectedMatch = (data: any) => ({
  type: UserSelectionTypes.SET_SELECTED_MATCH,
  payload: data,
});

export const setUserSelectLoading = (loading: boolean) => ({
  type: UserSelectionTypes.SET_SELECTION_LOADING,
  payload: loading,
});

export const setSelectedCommunity = (data: Community) => ({
  type: UserSelectionTypes.SET_SELECTED_COMMUNITY,
  payload: data,
});
