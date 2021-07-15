import useSWR, { SWRResponse } from 'swr';
import axios from 'axios';
import type { RelationshipData, ErrorAPI } from 'types';

export const useRelationships = (
  id: number
): SWRResponse<RelationshipData, ErrorAPI> =>
  useSWR(`/api/residents/${id}/relationships`);

interface addRelationshipFormData {
  personId: number;
  otherPersonId: number;
  createdBy: string;
  type: string;
  additionalOptions?: string[] | boolean;
  isMainCarer?: string;
  details?: string;
}

export const addRelationships = async (
  formData: addRelationshipFormData
): Promise<Record<string, unknown>> => {
  if (formData.additionalOptions && Array.isArray(formData.additionalOptions)) {
    if (
      formData.type === 'parent' &&
      formData.additionalOptions?.includes('isParentOfUnbornChild')
    ) {
      formData.type = 'parentOfUnbornChild';
    }

    if (
      formData.type === 'sibling' &&
      formData.additionalOptions?.includes('isSiblingOfUnbornChild')
    ) {
      formData.type = 'siblingOfUnbornChild';
    }

    if (formData.additionalOptions?.includes('isMainCarer')) {
      formData.isMainCarer = 'Y';
    }

    delete formData.additionalOptions;
  }

  const { data } = await axios.post(`/api/relationships`, formData);

  return data;
};
