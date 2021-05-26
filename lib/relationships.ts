import axios from 'axios';
import type { Relationship } from 'types';
const { ENDPOINT_API, AWS_KEY } = process.env;
const headers = { 'x-api-key': AWS_KEY };

export const getRelationshipByResident = async (
  personId: number
): Promise<Relationship[] | []> => {
  const { data }: { data: { relationships: Relationship[] } } = await axios.get(
    `${ENDPOINT_API}/residents/${personId}/relationships`,
    {
      headers,
    }
  );
  return data.relationships;
};
