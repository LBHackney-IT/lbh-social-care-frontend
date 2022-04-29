import axios from 'axios';

const POSTCODE_LOOKUP_URL = process.env.POSTCODE_LOOKUP_URL;
const POSTCODE_LOOKUP_APIKEY = process.env.POSTCODE_LOOKUP_APIKEY;

interface Address {
  line1: string;
  line2: string;
  line3: string;
  line4: string;
  town: string;
  postcode: string;
  UPRN: number;
}

export const getAddresses = async (
  postcode: string,
  page: string,
  buildingNumber?: string,
  pageSize?: string
): Promise<{ address: Address[] }> => {
  const { data } = await axios.get(
    `${POSTCODE_LOOKUP_URL}${postcode}${
      page !== undefined ? `&page=${page}` : ''
    }${pageSize !== undefined ? `&page_size=${pageSize}` : ''}${
      buildingNumber !== undefined ? `&buildingNumber=${buildingNumber}` : ''
    }`,
    {
      headers: {
        Authorization: POSTCODE_LOOKUP_APIKEY,
      },
    }
  );

  console.log('data', data);

  return data.data;
};
