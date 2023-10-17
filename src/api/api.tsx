import axios, { AxiosRequestConfig } from 'axios';

/* type Props = {
  url: string;
  method: string;
  body?: object;
}; */

async function makeRequest(config: AxiosRequestConfig) {
  const response = await axios(config);
  return response.data;
}

export async function get(url: string) {
  const config: AxiosRequestConfig = {
    method: 'GET',
    url,
  };
  return makeRequest(config);
}

export async function post(url: string, body: object) {
  const config: AxiosRequestConfig = {
    method: 'POST',
    url,
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
  };
  return makeRequest(config);
}

export async function put(url: string, body: object) {
  const config: AxiosRequestConfig = {
    method: 'PUT',
    url,
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
  };
  return makeRequest(config);
}

export async function del(url: string) {
  const config: AxiosRequestConfig = {
    method: 'DELETE',
    url,
  };
  return makeRequest(config);
}
