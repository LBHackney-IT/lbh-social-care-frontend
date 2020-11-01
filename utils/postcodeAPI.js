import axios from 'axios';

export const normalizeAddress = (address) => {
  // eslint-disable-next-line no-unused-vars
  const { uprn, postcode, line1, line2, line3, town } = address;
  const addr = {
    firstLine: line1,
    secondLine: line2,
    thirdLine: line3,
    ward: town,
  };
  return {
    addressText: Object.values(addr)
      .filter((a) => a !== '')
      .join(', '),
    address: {
      ...addr,
      uprn,
      postcode,
    },
  };
};

export const lookupPostcode = async (postcode) => {
  const { data } = await axios.get(`/api/postcode/${postcode}`);
  return data.address.map(normalizeAddress);
};
