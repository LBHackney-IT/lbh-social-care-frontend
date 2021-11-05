import axios from 'axios';

import { MashReferral } from 'types';

const ENDPOINT_API = process.env.ENDPOINT_API;
const AWS_KEY = process.env.AWS_KEY;

const headers = {
  'x-api-key': AWS_KEY,
};

export const getAllMashReferrals = async (): Promise<MashReferral[]> => {
  const { data } = await axios.get<MashReferral[]>(
    `${ENDPOINT_API}/mash-referral`,
    {
      headers,
    }
  );

  return data;
};

export const getMashReferral = async (id: string): Promise<MashReferral> => {
  const { data } = await axios.get<MashReferral>(
    `${ENDPOINT_API}/mash-referral/${id}`,
    {
      headers,
    }
  );

  return data;
};

interface ScreeningDecision {
  workerEmail: string;
  updateType: 'SCREENING-DECISION';
  decision: string;
  requiresUrgentContact: boolean;
  referralId: string;
}

export const patchReferral = async (
  update: ScreeningDecision
): Promise<MashReferral> => {
  const { data } = await axios.patch<MashReferral>(
    `${ENDPOINT_API}/mash-referral/${update.referralId}`,
    {
      workerEmail: update.workerEmail,
      updateType: update.updateType,
      decision: update.decision,
      requiresUrgentContact: update.requiresUrgentContact,
    },
    {
      headers: { 'Content-Type': 'application/json', 'x-api-key': AWS_KEY },
    }
  );

  return data;
};
