/**
 * Axios Request Wrapper
 * ---------------------
 *
 * @author  Sheharyar Naseer (@sheharyarn)
 * @license MIT
 *
 */

import axios from "axios";
import { getValueFor } from ".";
import { Constants } from "./Constants";

/**
 * Create an Axios Client with defaults
 */
export const client = axios.create({
  baseURL: Constants.api.baseUrl,
});

export const onSuccess = function (response: any) {
  console.debug("Request Successful!", response);
  return response.data;
};

export const onError = function (error: any) {
  console.error("Request Failed:", error.config);

  if (error.response) {
    // Request was made but server responded with something
    // other than 2xx
    console.error("Status:", error.response.status);
    console.error("Data:", error.response.data);
    console.error("Headers:", error.response.headers);
  } else {
    // Something else happened while setting up the request
    // triggered the error
    console.error("Error Message:", error.message);
  }

  return Promise.reject(error.response || error.message);
};

export const injectAuthTokenToRequest = () => {
  // Add a request interceptor
  client.interceptors.request.use(async function (config) {
    const jwt = await getValueFor(Constants.storage.AUTH_TOKEN) ?? '';
    if (config && config.headers && jwt) {
      config.headers.Authorization =  `Bearer ${jwt}`;
    }
    return config;
  });
}

/**
 * Request Wrapper with default success/error actions
 */
const request = function (options: any) {
  return client(options).then(onSuccess).catch(onError);
};

export default request;
