import axios from 'axios';

import type {
  Resident,
  ExtendedResident,
  ResidentAPI,
  AgeContext,
} from 'types';

const { ENDPOINT_API, AWS_KEY } = process.env;

const headers = { 'x-api-key': AWS_KEY };

interface ResidentBE extends Omit<Resident, 'restricted'> {
  restricted: 'Y' | 'N';
  addressList: Array<{
    displayAddressFlag: 'Y' | 'N';
    addressLine1: string;
    postCode: string;
    uprn: string;
  }>;
}

const sanitiseResidentData = (residents: ResidentBE[]): Resident[] =>
  residents?.map(
    ({ addressList, ...resident }: ResidentBE): Resident => {
      const address = addressList?.find(
        ({ displayAddressFlag }) => displayAddressFlag === 'Y'
      );
      return {
        ...resident,
        restricted: resident.restricted === 'Y',
        address: address && {
          address: address.addressLine1,
          postcode: address.postCode,
          uprn: address.uprn,
        },
      };
    }
  );

export const getResidents = async (
  params: Record<string, unknown>
): Promise<ResidentAPI> => {
  const { data } = await axios.get(`${ENDPOINT_API}/residents`, {
    headers,
    params,
  });
  return { ...data, residents: sanitiseResidentData(data.residents) };
};

export const getResident = async (
  personId: number,
  params: { context_flag: AgeContext }
): Promise<ExtendedResident> => {
  const { data } = await axios.get(`${ENDPOINT_API}/residents/${personId}`, {
    headers,
    params,
  });
  return { ...data, restricted: data.restricted === 'Y' };
};

export const normalisePhoneInput = (formData: {
  phoneNumbers?: Record<string, string>[];
  [key: string]: unknown;
}): Record<string, unknown> => ({
  ...formData,
  phoneNumbers: formData.phoneNumbers
    ? formData.phoneNumbers.map((phone) => ({
        ...phone,
        type: phone.type === '' ? 'main' : phone.type,
      }))
    : null,
});

export const addResident = async (
  formData: Record<string, unknown>
): Promise<ResidentAPI> => {
  const { data } = await axios.post(
    `${ENDPOINT_API}/residents`,
    normalisePhoneInput(formData),
    {
      headers: { ...headers, 'Content-Type': 'application/json' },
    }
  );
  return data;
};
