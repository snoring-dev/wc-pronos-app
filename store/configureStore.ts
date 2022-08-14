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
  };

  const middlewares = [thunk];

  const store = createStore(
    getRootReducer(),
    initialState,
    composeEnhancer(applyMiddleware(...middlewares))
  );

  return store;
};
