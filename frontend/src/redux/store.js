import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

import { rootReducer } from "./rootReducer";

const finalReducer = combineReducers({
  rootReducer,
});

const intialState = {
  rootReducer: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
};

const store = configureStore({
  reducer: finalReducer,
  preloadedState: intialState,
});

export default store;
