import axios from 'axios';

import type { Address } from 'types';

interface AddressAPI {
  postcode: string;
  UPRN: string;
  town: string;
  line1: string;
  line2?: string;
  line3?: string;
  line4?: string;
}

export const normalizeAddress = (address: AddressAPI): Address => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { UPRN, postcode, town, ...addressLine } = address;
  return {
    address: Object.values(addressLine)
      .filter((line) => line !== '' && line !== postcode)
      .join(', '),
    postcode,
    uprn: UPRN,
  };
};

export const lookupPostcode = async (postcode: string): Promise<Address[]> => {
  const { data } = await axios.get(`/api/postcode/${postcode}`);
  return data.address.map(normalizeAddress);
};
