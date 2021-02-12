import React from "react";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import configStore from "reducers/store";

import RoutesGenerator from "./router";
import "styles.css";

function App() {
  // create a redux store and persistor
  const { store, persistor } = configStore();

  return (
    <Provider store={store}>
      <PersistGate loading={<div />} persistor={persistor}>
        <RoutesGenerator />
      </PersistGate>
    </Provider>
  );
}

export default App;
