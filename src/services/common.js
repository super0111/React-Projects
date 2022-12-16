import { getFetch } from "./fetch";
import { restApiSettings } from "./api";
import * as axios from 'axios';

export const getLocalToken = () => {
  return localStorage.getItem("userInfo") != null
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;
};

export const setLocalToken = (userInfo) => {
  return localStorage.setItem("userInfo", userInfo);
};

export const removeLocalToken = () => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("userId");
}

export const getUserId = () => {
  return localStorage.getItem("userId") != null
    ? JSON.parse(localStorage.getItem("userId"))
    : null;
}

export const setUserId = (userId) => {
  return localStorage.setItem("userId", userId);
};

const getUrl = function (path, params = {}) {
  const url = new URL(`${restApiSettings.baseURL}${path}`);
  for (let [key, value] of Object.entries(params)) {
    if (value)
      url.searchParams.append(String(key), String(value));
  }
  return url.toString();
};

export const query = async function (path, options = {}, useToken = true) {
  if (!options.headers) {
    options.headers = {
      "Content-Type": "application/json",
      "Accept": "application/json"
    };
  }
  options.headers = options.headers || {};
  const userInfo = useToken ? getLocalToken() : null;
  const token = (userInfo && userInfo.token);
  if (token) {
    options.headers["Authorization"] = `Bearer ${token}`;
  }
  const url = getUrl(path, options.searchParams || {});
  const fetch = await getFetch(options);;
  const response = await fetch(url, options);

  console.log(response);

  if (200 <= response.status && 300 > response.status) {
    if (options && (options.responseType === 'blob')) {
      return response;
    }
    return response.json();
  }
  try {
    const error = await response.json();
    return Promise.reject(new Error(error.errors));
  } catch (error) {
    throw new Error(`HTTP status ${response.status} is not OK`);
  }
};

export const jsonQuery = async function (path, method, data, useToken = true) {
  return await query(
    path,
    {
      method,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    },
    useToken
  );
};

export const rawquery = async function (url, useBaseURL = true) {

  return await axios({
    method: "get",
    url: useBaseURL ? restApiSettings.baseURL + url : restApiSettings.alterURL + url,
  });
}

export const formdataquery = async function (data, url, useBaseURL = true) {
  return await axios({
    method: "post",
    url: useBaseURL ? restApiSettings.baseURL + url : restApiSettings.alterURL + url,
    data: data,
    headers: { "Content-Type": "application/json" },
  });
}

export const jsonFormQuery = async function (path, method, data, useToken = true) {
  return await query(
    path,
    {
      method,
      headers: {
        "Content-Type": undefined,
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    },
    useToken
  );
};

export const fileQuery = function (path, data) {
  var headers = [];
  const userInfo = getLocalToken();
  const token = (userInfo && userInfo.token);
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  const url = getUrl(path);
  return axios.post(url, data, {
    headers: {
      ...headers
    }
  })
  // get data
  .then(response => {
    return response.data;
  })
  // add url field
  .then(res => {
    return res
  });
};
