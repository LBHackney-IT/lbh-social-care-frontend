import axios from 'axios';

import { MashReferral } from 'types';

const ENDPOINT_API = process.env.ENDPOINT_API;
const AWS_KEY = process.env.AWS_KEY;

const headers = {
  'x-api-key': AWS_KEY,
};

export const getAllMashReferrals = async (): Promise<MashReferral> => {
  const { data } = await axios.get<MashReferral>(
    `${ENDPOINT_API}/mash-referral`,
    {
      headers,
    }
  );

  return data;
};
