import { FailureState } from "../../types";
import { MatchsActionTypes } from './types';

export const setMatchesData = (data: any) => ({
  type: MatchsActionTypes.SET_MATCHS_DATA,
  payload: data,
});

export const setMatchesLoading = (loading: boolean) => ({
  type: MatchsActionTypes.SET_MATCHS_LOADING,
  payload: loading,
});

export const setMatchesFailed = (failure: FailureState) => ({
  type: MatchsActionTypes.SET_MATCHS_FAILED,
  payload: failure,
});
