import axios from 'axios';

import { Worker } from 'types';

const { ENDPOINT_API, AWS_KEY } = process.env;

const headersWithKey = {
  'x-api-key': AWS_KEY,
};

export const getWorkers = async (
  params?: Record<string, unknown>
): Promise<Worker[]> => {
  const { data } = await axios.get(`${ENDPOINT_API}/workers`, {
    headers: headersWithKey,
    params,
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
    headers: headersWithKey,
    params: { email, ...params },
  });
  return data[0];
};
