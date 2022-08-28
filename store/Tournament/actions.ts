import { FailureState } from "../../types";
import { TournamentActionTypes } from "./types";

export const setTournamentData = (data: any) => ({
  type: TournamentActionTypes.SET_TOURNAMENT_DATA,
  payload: data,
});

export const setTournamentLoading = (loading: boolean) => ({
  type: TournamentActionTypes.SET_TOURNAMENT_LOADING,
  payload: loading,
});

export const setTournamentFailed = (failure: FailureState) => ({
  type: TournamentActionTypes.SET_TOURNAMENT_FAILED,
  payload: failure,
});
