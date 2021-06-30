import axios from 'axios';
import type { RelationshipData } from 'types';
const { ENDPOINT_API, AWS_KEY } = process.env;
const headers = { 'x-api-key': AWS_KEY };

export const getRelationshipByResident = async (
  personId: number
): Promise<RelationshipData[] | []> => {
  const { data }: { data: RelationshipData[] } = await axios.get(
    `${ENDPOINT_API}/residents/${personId}/relationships`,
    {
      headers,
    }
  );
  return data;
};

export const addRelationship = async (
  params: Record<string, unknown>
): Promise<void> => {
  // await axios.post(`${ENDPOINT_API}/relationships/personal`, params, {
  await axios.post(
    `https://virtserver.swaggerhub.com/Hackney/social-care-case-viewer-api/1.0.0/relationships/personal`,
    params,
    {
      headers: { ...headers, 'Content-Type': 'application/json' },
    }
  );
};
