import { AnyAction } from "redux";
import { AuthActionTypes, AuthState } from "./types";

const initialState: AuthState = {
  jwt: "",
  user: null,
  isLoading: false,
  failure: { status: 200, message: "OK" },
};

function reducer(state: AuthState = initialState, action: AnyAction) {
  const { type = "", payload = {} } = action;
  switch (type) {
    case AuthActionTypes.SET_USER_DATA: {
      return {
        ...initialState,
        ...payload,
      };
    }
    case AuthActionTypes.SET_AUTH_LOADING: {
      return {
        ...state,
        isLoading: payload,
      };
    }
    case AuthActionTypes.SET_AUTH_FAILED: {
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

export { reducer as AuthReducer };