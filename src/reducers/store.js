import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";
import thunk from "redux-thunk";

import rootReducer from "./rootReducers";

// persist the whitelisted in session storage
const persistConfig = {
  key: "root",
  storage: storageSession,
  whitelist: []
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const newStore = () => {
  // creates a store with persistor and thunk as middleware
  const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(thunk))
  );
  const persistor = persistStore(store);
  return { store, persistor };
};

export default newStore;
