import axios from 'axios';
import * as yup from 'yup';

const ENDPOINT_API = process.env.ENDPOINT_API;
const AWS_KEY = process.env.AWS_KEY;
const headers = { 'Content-Type': 'application/json', 'x-api-key': AWS_KEY };

export interface AllocationRequest {
  workerId: number | null;
  personId: number;
  allocatedTeamId: number;
  createdBy: string;
  ragRating: 'purple' | 'red' | 'amber' | 'green';
  allocationDate: Date;
}

export const allocateResidentSchema = yup.object({
  personId: yup.number().positive().integer().required(),
  allocatedTeamId: yup.number().positive().integer().required(),
  createdBy: yup.string().required(),
  ragRating: yup
    .string()
    .oneOf(['purple', 'red', 'amber', 'green', 'white'])
    .required(),
  allocationDate: yup.date().required(),
});

export const allocateResident = async (
  allocation: AllocationRequest
): Promise<void> => {
  try {
    const elm = await allocateResidentSchema.validate(allocation);
  } catch (e) {
    console.log(e);
  }
  const body = await allocateResidentSchema.validate(allocation);

  // const { data } = await axios.post(`${ENDPOINT_API}/allocations`, body, {
  const { data } = await axios.post(
    `https://virtserver.swaggerhub.com/Hackney/social-care-case-viewer-api/1.0.0/allocations`,
    body,
    {
      headers,
    }
  );

  return data;
};
