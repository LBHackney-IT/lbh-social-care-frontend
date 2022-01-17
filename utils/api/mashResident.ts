import axios from 'axios';
import { UpdateMashResidentData } from 'types';

export const updateMashResident = async (
  updateData: UpdateMashResidentData,
  mashResidentId: number
): Promise<Record<string, unknown>> => {
  const response = await axios.patch(
    `/api/mash-resident/${mashResidentId}`,
    updateData
  );
  return response?.data;
};
