import { AnyAction } from "redux";
import { MatchesState, MatchsActionTypes } from "./types";

const initialState: MatchesState = {
  data: [],
  isLoading: false,
  failure: { status: 200, message: "OK" },
};

function reducer(state: MatchesState = initialState, action: AnyAction) {
  const { type = "", payload = {} } = action;
  switch (type) {
    case MatchsActionTypes.SET_MATCHS_DATA: {
      return {
        ...initialState,
        data: {
          ...payload,
        },
      };
    }
    case MatchsActionTypes.SET_MATCHS_LOADING: {
      return {
        ...state,
        isLoading: payload,
      };
    }
    case MatchsActionTypes.SET_MATCHS_FAILED: {
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

export { reducer as MatchesReducer };
