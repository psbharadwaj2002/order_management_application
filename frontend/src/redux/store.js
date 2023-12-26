import { combineReducers, applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
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
const middleware = [thunk];

const store = configureStore({
  reducer: finalReducer,
  preloadedState: intialState,
  //   devTools: composeWithDevTools(applyMiddleware(...middleware)),
});

export default store;

// import { applyMiddleware } from "redux";
// import { configureStore } from "@reduxjs/toolkit";
// import { thunk } from "redux-thunk"; // Correct import

// import { composeWithDevTools } from "redux-devtools-extension";
// import { rootReducer } from "./rootReducer";

// const initialState = {
//   rootReducer: {
//     cartItems: localStorage.getItem("cartItems")
//       ? JSON.parse(localStorage.getItem("cartItems"))
//       : [],
//   },
// };

// const middleware = [thunk]; // Use 'thunk' directly

// const store = configureStore({
//   reducer: rootReducer,
//   preloadedState: initialState,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(middleware), // Spread 'middleware' array
//   devTools: composeWithDevTools(),
// });

// export default store;
