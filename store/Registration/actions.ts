import { FailureState } from "../../types";
import { RegistrationActionTypes, RegistrationData } from "./types";

export const setUserData = (userData: RegistrationData) => ({
    type: RegistrationActionTypes.SEND_USER_REGISTRATION,
    payload: userData,
});

export const setRegistrationFailed = (failure: FailureState) => ({
    type: RegistrationActionTypes.USER_REGISTRATION_FAILED,
    payload: failure,
});

export const setRegistrationSuccess = (registredUser: RegistrationData) => ({
    type: RegistrationActionTypes.USER_REGISTRATION_SUCCESS,
    payload: registredUser,
});