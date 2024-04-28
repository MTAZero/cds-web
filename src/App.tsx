import React from "react";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import ThemeRoutes from "./routers";
import { BrowserRouter } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PersistGate } from "redux-persist/integration/react";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeRoutes />
        </PersistGate>
      </BrowserRouter>
      <ToastContainer />
    </Provider>
  );
};

export default App;
