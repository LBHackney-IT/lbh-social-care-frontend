import axios from 'axios';

export const normalizeAddress = (address) => {
  // eslint-disable-next-line no-unused-vars
  const { UPRN, postcode, town, ...addressLine } = address;
  return {
    address: Object.values(addressLine)
      .filter((line) => line !== '' && line !== postcode)
      .join(', '),
    postcode,
    uprn: UPRN,
  };
};

export const lookupPostcode = async (postcode) => {
  const { data } = await axios.get(`/api/postcode/${postcode}`);
  return data.address.map(normalizeAddress);
};
