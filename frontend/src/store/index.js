import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import sessionReducer from './session';

import propertyReducer from './property'
import reservationReducer from './reservation'
import supportReducer from './support'
import keyReducer from "./key";

const rootReducer = combineReducers({
  // add reducer functions here
  session: sessionReducer,
  properties: propertyReducer,
  reservations: reservationReducer,
  supports: supportReducer,
  key: keyReducer
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
