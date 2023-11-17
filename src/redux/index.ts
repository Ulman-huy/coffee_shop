import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./reducer/userReducer";

const persistConfig = {
  key: "root",
  storage,
};

const appReducer = combineReducers({
  user: userReducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === "USER_LOGOUT") {
    // for all keys defined in your persistConfig(s)
    storage.removeItem("persist:root");
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export const persistor = persistStore(store);
