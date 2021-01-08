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

export const deleteResidentAllocatedWorkers = async (formData) => {
  const { data } = await axios.patch(
    `${ENDPOINT_API}/allocations/delete`,
    formData,
    {
      headers: { 'Content-Type': 'application/json', 'x-api-key': AWS_KEY },
    }
  );
  return { ref: data?.['_id'] };
};
