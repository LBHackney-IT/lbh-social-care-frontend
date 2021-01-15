import axios from 'axios';

const { ENDPOINT_API, AWS_KEY } = process.env;

export const getResidentAllocatedWorkers = async (mosaic_id, params) => {
  const { data } = await axios.get(`${ENDPOINT_API}/allocations`, {
    headers: { 'x-api-key': AWS_KEY },
    params: { mosaic_id, ...params },
  });
  // return data;
  // TODO: mocked data
  return {
    ...data,
    allocations: data.allocations.map((allocation, id) => ({
      id,
      ...allocation,
    })),
  };
  // TODO: mocked data
};

export const deleteResidentAllocatedWorker = async (id, body) => {
  /* const { data } = await axios.patch(
   `${ENDPOINT_API}/allocations/delete`,
   formData,
   {
     headers: { 'Content-Type': 'application/json', 'x-api-key': AWS_KEY },
   }
 );
 return { ref: data?.['_id'] }; */
  await new Promise((resolve) =>
    setTimeout(() => resolve(console.log('data is ' + id + body)), 3000)
  );
  return { test: 'test' };
};

export const addAllocatedWorker = async (
  mosaicId,
  { allocatedWorkerId, allocatedBy }
) => {
  const { data } = await axios.post(
    `${ENDPOINT_API}/allocations`,
    JSON.stringify({
      mosaicId: parseInt(mosaicId, 10),
      allocatedWorkerId: parseInt(allocatedWorkerId, 10),
      allocatedBy,
    }),
    {
      headers: { 'Content-Type': 'application/json', 'x-api-key': AWS_KEY },
    }
  );
  return data;
};
