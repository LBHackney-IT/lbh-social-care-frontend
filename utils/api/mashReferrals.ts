import axios from 'axios';
import { MashReferral } from 'types';

export const submitContactDecision = async (
  referralId: number,
  workerEmail: string,
  requiresUrgentContact: boolean
): Promise<MashReferral> => {
  const response = await axios.patch<MashReferral>(
    `/api/mash-referral/${referralId}/`,
    {
      requiresUrgentContact,
      updateType: 'CONTACT-DECISION',
      workerEmail: workerEmail,
    }
  );
  return response.data;
};

export const submitScreeningDecision = async (
  referralId: number,
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
  return response.data;
};

export const submitInitialDecision = async (
  referralId: number,
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

export const submitFinalDecision = async (
  referralId: number,
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
      updateType: 'FINAL-DECISION',
      workerEmail: workerEmail,
    }
  );
  return response.data;
};

export const assignWorker = async (
  referralId: number,
  workerEmail: string
): Promise<MashReferral> => {
  const response = await axios.patch<MashReferral>(
    `/api/mash-referral/${referralId}/`,
    {
      updateType: 'ASSIGN-WORKER',
      workerEmail,
    }
  );
  return response.data;
};

export const resetDummyData = async (): Promise<undefined> => {
  const response = await axios.post<undefined>(`api/mash-referral/reset`);
  return response.data;
};
