import axios from 'axios';

const { POSTCODE_LOOKUP_URL, POSTCODE_LOOKUP_APIKEY } = process.env;

export const getAddresses = async (postcode) => {
  const { data } = await axios.get(`${POSTCODE_LOOKUP_URL}${postcode}`, {
    headers: {
      Authorization: POSTCODE_LOOKUP_APIKEY,
    },
  });
  return data;
};
