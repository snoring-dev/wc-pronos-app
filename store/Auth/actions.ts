import { FailureState } from "../../types";
import { AuthActionTypes, User } from "./types";

export const setAuthenticatedUser = (jwt: string, user: User) => {
  return {
    type: AuthActionTypes.SET_USER_DATA,
    payload: { jwt, user },
  };
};

export const setAuthLoading = (value: boolean) => {
    return {
        type: AuthActionTypes.SET_AUTH_LOADING,
        payload: value,
    };
}

export const setAuthenticationFailed = (failure: FailureState) => ({
  type: AuthActionTypes.SET_AUTH_FAILED,
  payload: failure,
});
