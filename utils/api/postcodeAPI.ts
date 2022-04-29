import axios from 'axios';

import type { Address, AddressWrapper } from 'types';

export interface AddressAPI {
  postcode: string;
  UPRN: string;
  town: string;
  line1: string;
  line2?: string;
  line3?: string;
  line4?: string;
}

export const formatAddress = (address: AddressAPI): Address => {
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

export const lookupPostcode = async (
  postcode: string,
  page_number = 1,
  building_number?: string
): Promise<AddressWrapper> => {
  const { data } = await axios.get(
    `/api/postcode/${postcode}?page=${page_number}&pageSize=100&buildingNumber=${building_number}`
  );
  data.address = data.address.map(formatAddress);
  return data;
};
