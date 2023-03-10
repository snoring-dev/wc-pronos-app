import { Store, createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { ApplicationState, getRootReducer } from ".";

const composeEnhancer =
  window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] || compose;

export const configureStore = (): Store<ApplicationState> => {
  let initialState: ApplicationState = {
    registration: {
      data: {
        password: "",
        email: "",
        username: "",
      },
      failed: {
        status: 200,
        message: "",
      },
      isLoading: false,
    },
    auth: {
      jwt: "",
      user: null,
      failure: {
        status: 200,
        message: "",
      },
      isLoading: false,
    },
    tournament: {
      failure: {
        status: 200,
        message: "",
      },
      isLoading: false,
    },
    community: {
      communities: [],
      failure: {
        status: 200,
        message: "",
      },
      isLoading: false,
    },
    matches: {
      data: [],
      isLoading: false,
      failure: {
        status: 200,
        message: "",
      },
    },
    userSelection: {
      isLoading: false,
      match: undefined,
      community: undefined,
    },
  };

  const middlewares = [thunk];

  const store = createStore(
    getRootReducer(),
    initialState,
    composeEnhancer(applyMiddleware(...middlewares))
  );

  return store;
};
