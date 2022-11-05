import { FailureState } from "../../types";
import { AuthActionTypes, Profile, User } from "./types";

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
};

export const setProfileData = (profile: Profile) => {
  return {
    type: AuthActionTypes.SET_PROFILE_DATA,
    payload: profile,
  };
};

export const setUpdatedProfileData = (recentProfile: any) => {
  return {
    type: AuthActionTypes.UPDATE_PROFILE_DATA,
    payload: recentProfile,
  };
};

export const setAuthenticationFailed = (failure: FailureState) => ({
  type: AuthActionTypes.SET_AUTH_FAILED,
  payload: failure,
});

export const resetAuth = () => ({
  type: AuthActionTypes.RESET_AUTH,
});
