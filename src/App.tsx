import React from "react";
import {Provider} from "react-redux";
import {persistor, store} from "./redux/store";
import ThemeRoutes from "./routers";
import {BrowserRouter} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {PersistGate} from "redux-persist/integration/react";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";

import {ConfigProvider} from "antd";
import viVn from "antd/locale/vi_VN";
import {SWRConfig} from "swr";
import createApiServices from "utils/apis/make-api-request";
import {registerLicense} from "@syncfusion/ej2-base";
registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NBaF5cXmRCekx0Q3xbf1x0ZFFMYlRbQHRPMyBoS35RckVgW3hedHdWRGNUU0B1"
);
const api = createApiServices();
const App = () => {
  const fetcher = (url: string) =>
    api
      .makeAuthRequest({
        url: url,
        method: "GET",
      })
      .then(res => res.data);
  return (
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate loading={null} persistor={persistor}>
          <SWRConfig
            value={{
              fetcher,
              onErrorRetry: (error, key, config, revalidate, {retryCount}) => {
                return;
                // if (error.status === 404) return;
                // if (error.status === 403) return;
                // if (retryCount >= 0) return;
                // // Retry after 5 seconds.
                // setTimeout(() => revalidate({retryCount}), 5000);
              },
            }}
          >
            <ConfigProvider
              theme={{
                token: {
                  fontFamily: "Inter",
                  colorPrimary: "#177DB8",
                  fontSize: 16,
                },
              }}
              locale={viVn}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <ThemeRoutes />
              </LocalizationProvider>
            </ConfigProvider>
          </SWRConfig>
        </PersistGate>
      </BrowserRouter>
      <ToastContainer />
    </Provider>
  );
};

export default App;
