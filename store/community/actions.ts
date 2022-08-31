import { FailureState } from "../../types";
import { CommunityActionTypes } from "./types";

export const setCommunityData = (data: any) => ({
  type: CommunityActionTypes.SET_COMMUNITY_DATA,
  payload: data,
});

export const setCommunityLoading = (loading: boolean) => ({
  type: CommunityActionTypes.SET_COMMUNITY_LOADING,
  payload: loading,
});

export const setCommunityFailed = (failure: FailureState) => ({
  type: CommunityActionTypes.SET_COMMUNITY_FAILED,
  payload: failure,
});
