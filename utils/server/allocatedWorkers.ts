import axios from 'axios';
import * as yup from 'yup';
import isPast from 'date-fns/isPast';
import parseISO from 'date-fns/parseISO';

const { ENDPOINT_API, AWS_KEY } = process.env;

interface Allocation {
  id: number;
  caseStatus: 'Closed' | 'Open';
  allocationEndDate?: string;
}

interface AllocationData {
  allocations: Allocation[];
}

interface AllocationsParams {
  mosaic_id?: number;
  worker_id?: number;
  [key: string]: unknown;
}

const filterClosedAllocations = (allocations: Allocation[]) =>
  allocations?.filter(
    ({ caseStatus, allocationEndDate }) =>
      caseStatus?.toLowerCase() !== 'closed' &&
      (!allocationEndDate || !isPast(parseISO(allocationEndDate)))
  );

export const getAllocations = async (
  params: AllocationsParams,
  showOnlyOpen = true
): Promise<AllocationData> => {
  const { data } = await axios.get(`${ENDPOINT_API}/allocations`, {
    headers: { 'x-api-key': AWS_KEY },
    params,
  });
  return showOnlyOpen
    ? {
        ...data,
        allocations: filterClosedAllocations(data.allocations),
      }
    : data;
};

export const getResidentAllocatedWorkers = (
  mosaic_id: number,
  params?: AllocationsParams
): Promise<AllocationData> => getAllocations({ mosaic_id, ...params });

export const getResidentAllocation = async (
  mosaic_id: number,
  allocation_id: number,
  params?: Record<string, unknown>[]
): Promise<Allocation | undefined> => {
  const showOnlyOpen = false;
  const data = await getAllocations({ mosaic_id, ...params }, showOnlyOpen);
  return data?.allocations?.find(({ id }) => id === allocation_id);
};
export const getAllocationsByWorker = async (
  worker_id: number,
  params?: Record<string, unknown>
): Promise<AllocationData> => getAllocations({ worker_id, ...params });

const deleteAllocatedWorkerSchema = yup.object().shape({
  id: yup.number().required().integer(),
  createdBy: yup.string().email().required(),
  deallocationReason: yup.string().required(),
});

export const deleteAllocatedWorker = async (
  params: Record<string, unknown>
): Promise<Record<string, unknown>> => {
  const body = await deleteAllocatedWorkerSchema.validate(params);
  const { data } = await axios.patch(`${ENDPOINT_API}/allocations`, body, {
    headers: { 'Content-Type': 'application/json', 'x-api-key': AWS_KEY },
  });
  return data;
};

const addAllocatedWorkerSchema = yup.object({
  mosaicId: yup.number().required().positive().integer(),
  allocatedTeamId: yup.number().required().integer(),
  allocatedWorkerId: yup.number().required().integer(),
  allocatedBy: yup.string().email().required(),
});

export const addAllocatedWorker = async (
  mosaicId: number,
  params: Omit<yup.InferType<typeof addAllocatedWorkerSchema>, 'mosaicId'>
): Promise<Record<string, unknown>> => {
  const body = await addAllocatedWorkerSchema.validate({ mosaicId, ...params });
  const { data } = await axios.post(`${ENDPOINT_API}/allocations`, body, {
    headers: { 'Content-Type': 'application/json', 'x-api-key': AWS_KEY },
  });
  return data;
};
