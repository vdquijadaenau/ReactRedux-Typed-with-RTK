// A tiny wrapper around fetch(), borrowed from
// https://kentcdodds.com/blog/replace-axios-with-a-simple-custom-fetch-wrapper

import { TodoType } from "../server";

type ConfigType = {
  headers?: any;
  config?: { headers: any };
  method?: string;
  body?: string;
};

export async function client(
  endpoint: any,
  { body, ...customConfig }: ConfigType = {}
) {
  const headers = { "Content-Type": "application/json" };

  const config: ConfigType = {
    method: body ? "POST" : "GET",
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  let data;
  try {
    const response = await window.fetch(endpoint, config);
    data = await response.json();
    if (response.ok) {
      return data;
    }
    throw new Error(response.statusText);
  } catch (err: any) {
    return Promise.reject(err?.message ? err.message : data);
  }
}

client.get = function (endpoint: any, customConfig: any = {}) {
  return client(endpoint, { ...customConfig, method: "GET" });
};

client.post = function (endpoint: any, body: any, customConfig: any = {}) {
  return client(endpoint, { ...customConfig, body });
};
