import axios from 'axios';

const { ENDPOINT_API, AWS_KEY } = process.env;

const headersWithKey = {
  'x-api-key': AWS_KEY,
};

export const getAscAllocatedWorkers = async (params) => {
  const { data } = await axios.get(`${ENDPOINT_API}/asc-allocations`, {
    headers: headersWithKey,
    params: params,
  });

  return data;
};

export const getResidentsAscAllocatedWorkers = async (mosaic_id) => {
  const { data } = await axios.get(`${ENDPOINT_API}/asc-allocations`, {
    headers: { 'x-api-key': AWS_KEY },
    params: { mosaic_id },
  });
  return data.ascAllocations; //not sure what this should be
};

export const addAscAllocatedWorker = async (formData) => {
  const { data } = await axios.post(
    `${ENDPOINT_API}/asc-allocations`,
    formData,
    {
      headers: { 'Content-Type': 'application/json', 'x-api-key': AWS_KEY },
    }
  );
  return { ref: data?.['_id'] };
};
