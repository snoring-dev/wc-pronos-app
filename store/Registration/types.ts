import { FailureState } from "../../types";

export interface RegistrationState {
  data: RegistrationData;
  failed: FailureState;
  isLoading: boolean;
}

export interface RegistrationData {
  email: string;
  username: string;
  password: string;
}

export enum RegistrationActionTypes {
  SEND_USER_REGISTRATION = "@wc-app/registration/SEND_USER_REGISTRATION",
  USER_REGISTRATION_SUCCESS = "@wc-app/registration/USER_REGISTRATION_SUCCESS",
  USER_REGISTRATION_FAILED = "@wc-app/registration/USER_REGISTRATION_FAILED",
  USER_REGISTRATION_CLEAR = "@wc-app/registration/USER_REGISTRATION_CLEAR",
}
