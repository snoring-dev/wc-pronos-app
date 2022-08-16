import { AnyAction } from "redux";
import { RegistrationState, RegistrationActionTypes } from "./types";

const initialState: RegistrationState = {
  isLoading: false,
  data: {
    email: "",
    username: "",
    password: "",
  },
  failed: { status: 200, message: "OK" },
};

function reducer(state: RegistrationState = initialState, action: AnyAction) {
  const { type = "", payload = {} } = action;
  switch (type) {
    // switches
    case RegistrationActionTypes.SEND_USER_REGISTRATION: {
      return {
        ...state,
        isLoading: true,
        data: {
          ...payload,
        },
      };
    }
    case RegistrationActionTypes.USER_REGISTRATION_FAILED: {
        return {
            ...state,
            isLoading: false,
            failed: {
                ...payload,
            },
        };
    }
    case RegistrationActionTypes.USER_REGISTRATION_SUCCESS: {
        return {
            ...state,
            isLoading: false,
            data: {
                ...payload,
            },
        };
    }
    case RegistrationActionTypes.USER_REGISTRATION_CLEAR: {
      return {
        ...initialState,
      };
    }
    default: {
      return state;
    }
  }
}

export { reducer as RegistrationReducer };
