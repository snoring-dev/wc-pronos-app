import { FailureState } from "../../types";

export interface Team {
  id: number;
  name: string;
  country_code: string;
  flag: string;
  badge?: string;
}

export interface Table {
  wins: number;
  draws: number;
  losses: number;
  points: number;
  team: Team;
}

export interface Group {
  id: number;
  type: string;
  label: string;
  teams: Team[];
  table: Table[];
}

export interface TournamentState {
  id?: number;
  name?: string;
  year?: number;
  startDate?: string;
  endDate?: string;
  groups?: Group[];
  isLoading?: boolean;
  failure?: FailureState | null;
}

export enum TournamentActionTypes {
  SET_TOURNAMENT_DATA = "@wc-app/tournament/SET_TOURNAMENT_DATA",
  SET_TOURNAMENT_FAILED = "@wc-app/tournament/SET_TOURNAMENT_FAILED",
  SET_TOURNAMENT_LOADING = "@wc-app/tournament/SET_TOURNAMENT_LOADING",
}
