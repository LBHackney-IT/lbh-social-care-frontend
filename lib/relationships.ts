import axios from 'axios';
import type { RelationshipData } from 'types';
const { ENDPOINT_API, AWS_KEY } = process.env;
const headers = { 'x-api-key': AWS_KEY };

export const getRelationshipByResident = async (
  personId: number
): Promise<RelationshipData[] | []> => {
  const { data }: { data: RelationshipData[] } = await axios.get(
    `${ENDPOINT_API}/residents/${personId}/relationships-v1`,
    {
      headers,
    }
  );
  return data;
};
