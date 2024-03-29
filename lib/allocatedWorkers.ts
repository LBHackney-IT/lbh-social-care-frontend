import axios from 'axios';
import * as yup from 'yup';

import type { Allocation, AllocationData } from 'types';
import { getQueryString } from 'utils/urls';

const ENDPOINT_API = process.env.ENDPOINT_API;
const AWS_KEY = process.env.AWS_KEY;

interface AllocationsParams {
  mosaic_id?: number;
  worker_id?: number;
  allocation_id?: number;
  [key: string]: unknown;
}

export const getAllocations = async (
  params: AllocationsParams,
  showOnlyOpen = true,
  sort_by?: string
): Promise<AllocationData> => {
  const urlParameters = {
    sort_by: sort_by ? sort_by : 'rag_rating',
    status: showOnlyOpen ? 'open' : undefined,
  };
  const { data } = await axios.get(
    `${ENDPOINT_API}/allocations?${getQueryString(urlParameters)}`,
    {
      headers: { 'x-api-key': AWS_KEY },
      params,
    }
  );
  return data;
};

export const getResidentAllocatedWorkers = (
  mosaic_id: number,
  params?: AllocationsParams
): Promise<AllocationData> => getAllocations({ mosaic_id, ...params });

export const getResidentAllocation = async (
  allocation_id: number,
  params?: AllocationsParams
): Promise<Allocation | undefined> => {
  const showOnlyOpen = false;
  const data = await getAllocations(
    { allocation_id: allocation_id, ...params },
    showOnlyOpen
  );
  return data?.allocations?.find(({ id }) => id === allocation_id);
};
export const getAllocationsByWorker = async (
  worker_id: number,
  sort_by?: string,
  params?: AllocationsParams
): Promise<AllocationData> =>
  getAllocations({ worker_id, ...params }, true, sort_by);

export const getAllocationsByTeam = async (
  params: AllocationsParams
): Promise<AllocationData> => {
  const urlParameters = getQueryString({
    ...params,
    showOnlyOpen: true,
  });

  const { data } = await axios.get(
    `${ENDPOINT_API}/allocations?${urlParameters}`,
    {
      headers: { 'x-api-key': AWS_KEY },
      params,
    }
  );
  return data;
};

const deleteAllocationSchema = yup.object({
  id: yup.number().required().positive().integer(),
  deallocationReason: yup.string().required(),
  deallocationDate: yup.string().required(),
  createdBy: yup.string().email().required(),
});

export const deleteAllocation = async (
  params: yup.InferType<typeof deleteAllocationSchema>
): Promise<Record<string, unknown>> => {
  const body = await deleteAllocationSchema.validate(params);
  const { data } = await axios.patch(`${ENDPOINT_API}/allocations`, body, {
    headers: { 'Content-Type': 'application/json', 'x-api-key': AWS_KEY },
  });
  return data;
};

const addAllocatedWorkerSchema = yup.object({
  mosaicId: yup.number().required().positive().integer(),
  allocatedTeamId: yup.number().required().integer(),
  allocatedWorkerId: yup.number().integer().nullable(),
  allocationStartDate: yup.string().required(),
  ragRating: yup.string().required(),
  createdBy: yup.string().email().required(),
});

export const addAllocatedWorker = async (
  mosaicId: yup.InferType<typeof addAllocatedWorkerSchema>['mosaicId'],
  params: Omit<yup.InferType<typeof addAllocatedWorkerSchema>, 'mosaicId'>
): Promise<Record<string, unknown>> => {
  const body = await addAllocatedWorkerSchema.validate({ mosaicId, ...params });

  const { data } = await axios.post(`${ENDPOINT_API}/allocations`, body, {
    headers: { 'Content-Type': 'application/json', 'x-api-key': AWS_KEY },
  });
  return data;
};

const patchAllocationSchema = yup.object({
  allocationId: yup.number().integer().nullable(),
  ragRating: yup.string().required(),
});

export const patchAllocation = async (
  params: Omit<yup.InferType<typeof patchAllocationSchema>, 'mosaicId'>
): Promise<Record<string, unknown>> => {
  const body = await patchAllocationSchema.validate({
    ...params,
  });
  const { data } = await axios.patch(`${ENDPOINT_API}/allocations`, body, {
    headers: { 'Content-Type': 'application/json', 'x-api-key': AWS_KEY },
  });

  return data;
};

const addWorkerAllocationSchema = yup.object({
  allocationId: yup.number().integer().nullable(),
  allocatedTeamId: yup.number().integer().nullable(),
  allocatedWorkerId: yup.number().integer().nullable(),
  allocationStartDate: yup.string().required(),
});

export const addWorkerAllocation = async (
  mosaicId: number,
  params: Omit<yup.InferType<typeof addWorkerAllocationSchema>, 'mosaicId'>
): Promise<Record<string, unknown>> => {
  const body = await addWorkerAllocationSchema.validate({
    mosaicId,
    ...params,
  });
  const { data } = await axios.post(`${ENDPOINT_API}/allocations`, body, {
    headers: { 'Content-Type': 'application/json', 'x-api-key': AWS_KEY },
  });

  return data;
};
