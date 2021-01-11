import axios from 'axios';

const { ENDPOINT_API, AWS_KEY } = process.env;

export const getResidentAllocatedWorkers = async (mosaic_id, params) => {
  const { data } = await axios.get(`${ENDPOINT_API}/allocations`, {
    headers: { 'x-api-key': AWS_KEY },
    params: { mosaic_id, ...params },
  });
  return data;
};

export const addAllocatedWorker = async (resident_id, body) => {
  const { data } = await axios.post(
    `${ENDPOINT_API}/allocations`,
    { resident_id, ...body },
    {
      headers: { 'Content-Type': 'application/json', 'x-api-key': AWS_KEY },
    }
  );
  return data;
};
