import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import themeReducer from "./theme/themeSlice";
import { fetchDataSuccess, fetchDataFailure } from "./actions/Actions";
import { fetchDataFromFirebase } from "../../firebaseConfig";

// Define your data reducer
const dataReducer = (state = { data: null, error: null }, action) => {
  switch (action.type) {
    case "FETCH_DATA_SUCCESS":
      return { ...state, data: action.payload, error: null };
    case "FETCH_DATA_FAILURE":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

// Combine all reducers
const rootReducer = combineReducers({
  theme: themeReducer,
  data: dataReducer, // Add your data reducer here
});

// Configure Redux persist
const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create Redux store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

// Create a thunk to fetch data from Firebase
export const fetchFirebaseData = () => {
  return async (dispatch) => {
    try {
      const data = await fetchDataFromFirebase(); // Call the Firebase function to fetch data
      dispatch(fetchDataSuccess(data));
    } catch (error) {
      dispatch(fetchDataFailure(error));
    }
  };
};

// Initialize Redux persistor
export const persistor = persistStore(store);
