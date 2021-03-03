import axios from 'axios';

import type { Resident, ResidentAPI } from 'types';

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
  mosaic_id: number,
  params: Record<string, unknown>
): Promise<Resident> => {
  const { data } = await axios.get(`${ENDPOINT_API}/residents`, {
    headers,
    params: { mosaic_id, ...params },
  });
  return sanitiseResidentData(data.residents)?.[0];
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
