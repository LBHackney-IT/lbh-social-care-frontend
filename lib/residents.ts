import axios from 'axios';

import type { LegacyResident, Resident, ResidentsAPI, User } from 'types';
import { getAuditingParams } from '../utils/auditing';

const { ENDPOINT_API, AWS_KEY } = process.env;

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

export const getResidents = async (
  params: Record<string, unknown>
): Promise<ResidentsAPI> => {
  const { data } = await axios.get(`${ENDPOINT_API}/residents`, {
    headers,
    params,
  });
  return { ...data, residents: sanitiseResidentData(data.residents) };
};

export const getResident = async (
  personId: number,
  user: User
): Promise<Resident> => {
  const { data } = await axios.get(`${ENDPOINT_API}/residents/${personId}`, {
    headers,
    params: getAuditingParams(user),
  });
  return data;
};

export const normalisePhoneInput = (
  formData: Resident
): Record<string, unknown> => ({
  ...formData,
  phoneNumbers: formData.phoneNumbers
    ? formData.phoneNumbers.map((phone) => ({
        ...phone,
        type: phone.type === '' ? 'main' : phone.type,
      }))
    : null,
});

export const addResident = async (
  formData: Resident
): Promise<ResidentsAPI> => {
  const { data } = await axios.post(
    `${ENDPOINT_API}/residents`,
    normalisePhoneInput(formData),
    {
      headers: { ...headers, 'Content-Type': 'application/json' },
    }
  );
  return data;
};

export const updateResident = async (formData: Resident): Promise<Resident> => {
  await axios.patch(
    `${ENDPOINT_API}/residents`,
    normalisePhoneInput(formData),
    {
      headers: { ...headers, 'Content-Type': 'application/json' },
    }
  );
  return formData;
};
