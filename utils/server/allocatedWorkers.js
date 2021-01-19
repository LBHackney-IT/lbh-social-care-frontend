import axios from 'axios';
import * as yup from 'yup';

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

const deleteAllocatedWorkerSchema = yup.object().shape({
  id: yup.number().required().integer(),
  deallocationReason: yup.string().required(),
});

export const deleteAllocatedWorker = async (params) => {
  const body = await deleteAllocatedWorkerSchema.validate({ ...params });
  const { data } = await axios.patch(`${ENDPOINT_API}/allocations`, body, {
    headers: { 'Content-Type': 'application/json', 'x-api-key': AWS_KEY },
  });
  return data;
  /* await new Promise((resolve) =>
   setTimeout(() => resolve(console.log('data is ' + id + body)), 3000)
 );
 return { test: 'test' }; */
};

const addAllocatedWorkerSchema = yup.object().shape({
  mosaicId: yup.number().required().integer(),
  allocatedWorkerId: yup.number().required().integer(),
  allocatedBy: yup.string().email().required(),
});

export const addAllocatedWorker = async (mosaicId, params) => {
  const body = await addAllocatedWorkerSchema.validate({ mosaicId, ...params });
  const { data } = await axios.post(`${ENDPOINT_API}/allocations`, body, {
    headers: { 'Content-Type': 'application/json', 'x-api-key': AWS_KEY },
  });
  return data;
};
