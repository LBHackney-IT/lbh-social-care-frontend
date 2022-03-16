import axios from 'axios';
import * as yup from 'yup';

const ENDPOINT_API = process.env.ENDPOINT_API;
const AWS_KEY = process.env.AWS_KEY;
const headers = { 'Content-Type': 'application/json', 'x-api-key': AWS_KEY };

export interface AllocationRequest {
  workerId: number;
  personId: number;
  allocatedTeamId: number;
  createdBy: number;
  summary: string;
  carePackage: string;
  ragRating: 'purple' | 'red' | 'amber' | 'green';
  allocationDate: Date;
}

export const allocateResidentSchema = yup.object({
  workerId: yup.number().positive().integer().required(),
  personId: yup.number().positive().integer().required(),
  allocatedTeamId: yup.number().positive().integer().required(),
  createdBy: yup.number().positive().integer().required(),
  summary: yup.string().required(),
  carePackage: yup.string().required(),
  ragRating: yup.string().oneOf(['purple', 'red', 'amber', 'green']).required(),
  allocationDate: yup.date().required(),
});

export const allocateResident = async (
  allocation: AllocationRequest
): Promise<void> => {
  const body = await allocateResidentSchema.validate(allocation);

  const { data } = await axios.post(`${ENDPOINT_API}/allocations`, body, {
    headers,
  });

  return data;
};
