import { AnyAction } from "redux";
import { TournamentActionTypes, TournamentState } from "./types";

const initialState: TournamentState = {
  isLoading: false,
  failure: { status: 200, message: "OK" },
};

function reducer(state: TournamentState = initialState, action: AnyAction) {
  const { type = "", payload = {} } = action;
  switch (type) {
    case TournamentActionTypes.SET_TOURNAMENT_DATA: {
      return {
        ...initialState,
        ...payload,
      };
    }
    case TournamentActionTypes.SET_TOURNAMENT_LOADING: {
      return {
        ...state,
        isLoading: payload,
      };
    }
    case TournamentActionTypes.SET_TOURNAMENT_FAILED: {
      return {
        ...state,
        isLoading: false,
        failure: {
          ...payload,
        },
      };
    }
    default: {
      return state;
    }
  }
}

export { reducer as TournamentReducer };
