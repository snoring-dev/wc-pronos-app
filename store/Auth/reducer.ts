import { AnyAction } from "redux";
import { AuthActionTypes, AuthState } from "./types";

const initialState: AuthState = {
  jwt: '',
  user: null,
  isLoading: false,
  failure: null,
};

function reducer(state: AuthState = initialState, action: AnyAction) {
  const { type = "", payload = {} } = action;
  switch (type) {
    case AuthActionTypes.SET_USER_DATA: {
        return {
            ...state,
            ...payload,
        };
    }
    default: {
      return state;
    }
  }
}

export { reducer as AuthReducer };
