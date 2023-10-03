import React from 'react';
import axios, { AxiosRequestConfig } from 'axios';

type Props = {
  url: string;
  method: string;
  body?: object;
};

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

export default function api({ url, method, body }: Props) {
  let data;
  switch (method) {
    case 'GET':
      data = get(url);
      break;
    case 'POST':
      data = post(url, body);
      break;
    case 'PUT':
      data = put(url, body);
      break;
    case 'DELETE':
      data = del(url);
      break;
    default:
      throw new Error(`Invalid method: ${method}`);
  }
  return <div>{JSON.stringify(data)}</div>;
}
