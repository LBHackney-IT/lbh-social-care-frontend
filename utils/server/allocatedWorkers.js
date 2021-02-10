import axios from 'axios';
import * as yup from 'yup';
import isPast from 'date-fns/isPast';
import parseISO from 'date-fns/parseISO';

const { ENDPOINT_API, AWS_KEY } = process.env;

const filterClosedAllocations = (allocations) =>
  allocations?.filter(
    ({ caseStatus, allocationEndDate }) =>
      caseStatus?.toLowerCase() !== 'closed' &&
      !isPast(parseISO(allocationEndDate))
  );

export const getAllocations = async (params) => {
  const { data } = await axios.get(`${ENDPOINT_API}/allocations`, {
    headers: { 'x-api-key': AWS_KEY },
    params,
  });
  return {
    ...data,
    allocations: filterClosedAllocations(data.allocations),
  };
};

export const getResidentAllocatedWorkers = (mosaic_id, params) =>
  getAllocations({ mosaic_id, ...params });

export const getAllocationsByWorker = async (worker_id, params) =>
  getAllocations({ worker_id, ...params });

const deleteAllocatedWorkerSchema = yup.object().shape({
  id: yup.number().required().integer(),
  createdBy: yup.string().email().required(),
  deallocationReason: yup.string().required(),
});

export const deleteAllocatedWorker = async (params) => {
  const body = await deleteAllocatedWorkerSchema.validate(params);
  const { data } = await axios.patch(`${ENDPOINT_API}/allocations`, body, {
    headers: { 'Content-Type': 'application/json', 'x-api-key': AWS_KEY },
  });
  return data;
};

const addAllocatedWorkerSchema = yup.object().shape({
  mosaicId: yup.number().required().integer(),
  allocatedTeamId: yup.number().required().integer(),
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
