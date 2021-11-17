import axios from 'axios';
import { MashReferral } from 'types';

export const submitScreeningDecision = async (
  referralId: string,
  workerEmail: string,
  decision: string,
  requiresUrgentContact: boolean
): Promise<MashReferral> => {
  const response = await axios.patch<MashReferral>(
    `/api/mash-referral/${referralId}/`,
    {
      decision,
      requiresUrgentContact,
      updateType: 'SCREENING-DECISION',
      workerEmail: workerEmail,
    }
  );
  return response?.data;
};

export const submitInitialDecision = async (
  referralId: string,
  workerEmail: string,
  decision: string,
  referralCategory: string,
  requiresUrgentContact: boolean
): Promise<MashReferral> => {
  const response = await axios.patch<MashReferral>(
    `/api/mash-referral/${referralId}/`,
    {
      decision,
      requiresUrgentContact,
      referralCategory,
      updateType: 'INITIAL-DECISION',
      workerEmail: workerEmail,
    }
  );

  return response.data;
};
