import { AnyAction } from "redux";
import { UserSelectionTypes, UserSelectionState } from "./types";

const initialState: UserSelectionState = {
  isLoading: false,
  match: undefined,
  community: undefined,
};

function reducer(state: UserSelectionState = initialState, action: AnyAction) {
  const { type = "", payload = {} } = action;
  switch (type) {
    case UserSelectionTypes.SET_SELECTED_COMMUNITY: {
      return {
        ...state,
        community: {
            ...payload,
        },
      };
    }
    case UserSelectionTypes.SET_SELECTION_LOADING: {
      return {
        ...state,
        isLoading: payload,
      };
    }
    case UserSelectionTypes.SET_SELECTED_MATCH: {
      return {
        ...state,
        match: {
          ...payload,
        },
      };
    }
    default: {
      return state;
    }
  }
}

export { reducer as UserSelectionReducer };
