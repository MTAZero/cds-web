import axios, {AxiosInstance} from "axios";
import {getAuthToken} from "../store";
import {AppConfigs, SSOConfigs} from "../../const";

const serverUrl = SSOConfigs.urlSSO;

const _makeRequest = (instantAxios: AxiosInstance) => async (args: any) => {
  const _headers = args.headers ? args.headers : {};
  const body = args.body ? args.body : {};
  const defaultHeaders = {};
  args = {
    ...args,
    headers: {
      ...defaultHeaders,
      ..._headers,
    },
    body,
  };

  const request = instantAxios(args);

  return request
    .then((response: any) => (response?.data ? response?.data : response))
    .catch((error: any) => {
      throw error.response?.data ? error.response?.data : error.response;
    });
};

const _makeAuthRequest = (instantAxios: AxiosInstance) => async (args: any) => {
  const requestHeaders = args.headers ? args.headers : {};
  const accessToken = getAuthToken();

  let headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  args = {
    ...args,
    headers: {
      ...requestHeaders,
      ...headers,
    },
  };

  const request = instantAxios(args);

  return request
    .then((response: any) => (response?.data ? response?.data : response))
    .catch((error: any) => {
      throw {
        message: error.response?.data ? error.response?.data : error.response,
      };
    });
};

const request = (options: any = {}) => {
  let BaseURL = serverUrl;

  if (options.BaseURL) BaseURL = options.BaseURL;

  const instance: AxiosInstance = axios.create({
    baseURL: BaseURL,
    timeout: 30000,
  });

  return {
    makeRequest: _makeRequest(instance),
    makeAuthRequest: _makeAuthRequest(instance),
  };
};

export default request;
