import { FailureState } from "../../types";

export interface User {
    id: 4,
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean
    createdAt: string;
    updatedAt: string;
}

export interface AuthState {
    jwt: string;
    user: User | null;
    isLoading?: boolean;
    failure?: FailureState | null;
}

export enum AuthActionTypes {
    SET_USER_DATA = "@wc-app/auth/SET_USER_DATA",
    SET_AUTH_FAILED = "@wc-app/auth/SET_AUTH_FAILED",
    SET_AUTH_LOADING = "@wc-app/auth/SET_AUTH_LOADING",
}