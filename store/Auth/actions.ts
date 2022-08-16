import { AuthActionTypes, User } from "./types";

export const setAuthenticatedUser = (jwt: string, user: User) => {
    return {
        type: AuthActionTypes.SET_USER_DATA,
        payload: { jwt, user },
    };
}