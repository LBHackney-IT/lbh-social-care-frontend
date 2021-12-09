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

export const patchReferralScreening = async (
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

interface InitialDecision {
  workerEmail: string;
  updateType: 'INITIAL-DECISION';
  decision: string;
  referralCategory: string;
  requiresUrgentContact: boolean;
  referralId: string;
}

export const patchReferralInitial = async (
  update: InitialDecision
): Promise<MashReferral> => {
  const { data } = await axios.patch<MashReferral>(
    `${ENDPOINT_API}/mash-referral/${update.referralId}`,
    {
      workerEmail: update.workerEmail,
      updateType: update.updateType,
      decision: update.decision,
      requiresUrgentContact: update.requiresUrgentContact,
      referralCategory: update.referralCategory,
    },
    {
      headers: { 'Content-Type': 'application/json', 'x-api-key': AWS_KEY },
    }
  );

  return data;
};

interface FinalDecision {
  workerEmail: string;
  updateType: 'FINAL-DECISION';
  decision: string;
  referralCategory: string;
  requiresUrgentContact: boolean;
  referralId: string;
}

export const patchReferralFinal = async (
  update: FinalDecision
): Promise<MashReferral> => {
  const { data } = await axios.patch<MashReferral>(
    `${ENDPOINT_API}/mash-referral/${update.referralId}`,
    {
      workerEmail: update.workerEmail,
      updateType: update.updateType,
      decision: update.decision,
      requiresUrgentContact: update.requiresUrgentContact,
      referralCategory: update.referralCategory,
    },
    {
      headers: { 'Content-Type': 'application/json', 'x-api-key': AWS_KEY },
    }
  );

  return data;
};
interface ContactDecision {
  workerEmail: string;
  updateType: 'CONTACT-DECISION';
  requiresUrgentContact: boolean;
  referralId: string;
}

export const patchReferralContact = async (
  update: ContactDecision
): Promise<MashReferral> => {
  const { data } = await axios.patch<MashReferral>(
    `${ENDPOINT_API}/mash-referral/${update.referralId}`,
    {
      workerEmail: update.workerEmail,
      updateType: update.updateType,
      requiresUrgentContact: update.requiresUrgentContact,
    },
    {
      headers: { 'Content-Type': 'application/json', 'x-api-key': AWS_KEY },
    }
  );

  return data;
};

export const resetDummyData = async (): Promise<undefined> => {
  const { data } = await axios.post<undefined>(
    `${ENDPOINT_API}/mash-referral/reset2`,
    undefined,
    {
      headers: { 'Content-Type': 'application/json', 'x-api-key': AWS_KEY },
    }
  );
  return data;
};
