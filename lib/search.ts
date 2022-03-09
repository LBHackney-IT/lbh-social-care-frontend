import axios from 'axios';
import type { ResidentsAPI, LegacyResident } from 'types';

const ENDPOINT_API = process.env.ENDPOINT_API;
const AWS_KEY = process.env.AWS_KEY;
const headers = { 'x-api-key': AWS_KEY };

interface ResidentBE extends LegacyResident {
  addressList: Array<{
    displayAddressFlag: 'Y' | 'N';
    addressLine1: string;
    postCode: string;
    uprn: string;
  }>;
}

const sanitiseResidentData = (residents: ResidentBE[]): LegacyResident[] =>
  residents?.map(({ addressList, ...resident }: ResidentBE): LegacyResident => {
    const address = addressList?.find(
      ({ displayAddressFlag }) => displayAddressFlag === 'Y'
    );
    return {
      ...resident,
      address: address && {
        address: address.addressLine1,
        postcode: address.postCode,
        uprn: address.uprn,
      },
    };
  });

const searchUrlParameters = (
  name?: string,
  dateOfBirth?: string,
  postcode?: string,
  personId?: string,
  cursor?: string
) => {
  let queryString = '';

  name
    ? (queryString = queryString.concat(
        queryString ? '&' : '?',
        `name=${name}`
      ))
    : '';
  dateOfBirth
    ? (queryString = queryString.concat(
        queryString ? '&' : '?',
        `date_of_birth=${dateOfBirth}`
      ))
    : '';
  postcode
    ? (queryString = queryString.concat(
        queryString ? '&' : '?',
        `postcode=${postcode}`
      ))
    : '';
  personId
    ? (queryString = queryString.concat(
        queryString ? '&' : '?',
        `person_id=${personId}`
      ))
    : '';
  cursor
    ? (queryString = queryString.concat(
        queryString ? '&' : '?',
        `cursor=${cursor}`
      ))
    : (queryString = queryString.concat(queryString ? '&' : '?', `cursor=0`));

  console.log('URL Parameters', queryString);

  return queryString;
};

export const searchPerson = async (
  name?: string,
  dateOfBirth?: string,
  postcode?: string,
  personId?: string,
  cursor?: string
): Promise<ResidentsAPI> => {
  const urlParms = searchUrlParameters(
    name,
    dateOfBirth,
    postcode,
    personId,
    cursor
  );
  console.log(
    `https://virtserver.swaggerhub.com/Hackney/social-care-case-viewer-api/1.0.0/search${urlParms}`
  );
  const { data } = await axios.get(
    `
    https://virtserver.swaggerhub.com/Hackney/social-care-case-viewer-api/1.0.0/search${urlParms}`,
    {
      headers,
    }
  );
  return { ...data, residents: sanitiseResidentData(data.residents) };
};
