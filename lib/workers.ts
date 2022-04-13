import axios from 'axios';

import { Worker } from 'types';

const ENDPOINT_API = process.env.ENDPOINT_API;
const AWS_KEY = process.env.AWS_KEY;
import { getQueryString } from 'utils/urls';

const headers = {
  'x-api-key': AWS_KEY,
};

export const getWorkers = async (
  params?: Record<string, unknown>
): Promise<Worker[]> => {
  const urlParameters = getQueryString({
    ...params,
  });

  const { data } = await axios.get(`${ENDPOINT_API}/workers?${urlParameters}`, {
    headers,
  });
  return data;
};

export const getWorker = async (
  id: number,
  params?: Record<string, unknown>
): Promise<Worker> => {
  const data = await getWorkers({ id, ...params });
  return data[0];
};

export const getWorkerByEmail = async (
  email: string,
  params?: Record<string, unknown>
): Promise<Worker> => {
  const { data } = await axios.get(`${ENDPOINT_API}/workers`, {
    headers,
    params: { email, ...params },
  });
  return data[0];
};

export const addWorker = async (formData: Worker): Promise<Worker> => {
  const { data } = await axios.post(`${ENDPOINT_API}/workers`, formData, {
    headers: { ...headers, 'Content-Type': 'application/json' },
  });
  return data;
};

export const updateWorker = async (formData: Worker): Promise<Worker> => {
  await axios.patch(`${ENDPOINT_API}/workers`, formData, {
    headers: { ...headers, 'Content-Type': 'application/json' },
  });
  return formData;
};
