import React from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import ThemeRoutes from "./routers";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeRoutes />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
