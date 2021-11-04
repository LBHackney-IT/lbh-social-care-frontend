import axios from 'axios';
import { MashReferral } from 'types';

export const submitScreeningDecision = async (
  referralId: string,
  decision: string,
  requiresUrgentContact: boolean,
  workerEmail: string
): Promise<MashReferral> => {
  const response = await axios.patch<MashReferral>(
    `/api/mash-referral/${referralId}/`,
    {
      referralId,
      decision,
      requiresUrgentContact,
      updateType: 'SCREENING-DECISION',
      workerEmail: workerEmail,
    }
  );
  return response?.data;
};
