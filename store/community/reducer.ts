import { AnyAction } from "redux";
import { CommunityActionTypes, CommunityState } from "./types";

const initialState: CommunityState = {
  communities: [],
  isLoading: false,
  failure: { status: 200, message: "OK" },
};

function reducer(state: CommunityState = initialState, action: AnyAction) {
  const { type = "", payload = {} } = action;
  switch (type) {
    case CommunityActionTypes.SET_COMMUNITY_DATA: {
      return {
        ...state,
        failure: initialState.failure,
        communities: [...state.communities, payload],
      };
    }
    case CommunityActionTypes.SET_COMMUNITY_LOADING: {
      return {
        ...state,
        isLoading: payload,
      };
    }
    case CommunityActionTypes.SET_COMMUNITY_FAILED: {
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

export { reducer as CommunityReducer };
