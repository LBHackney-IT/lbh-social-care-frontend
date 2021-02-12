import axios from 'axios';

const { ENDPOINT_API, AWS_KEY } = process.env;

const headersWithKey = {
  'x-api-key': AWS_KEY,
};

const regex = /"_id.*ObjectId\(.*\),./;

const sanitiseCaseFormData = (caseFormData) =>
  caseFormData && JSON.parse(caseFormData.replace(regex, ''));

export const getCases = async (params) => {
  const { data } = await axios.get(`${ENDPOINT_API}/cases`, {
    headers: headersWithKey,
    params: params,
  });
  return {
    ...data,
    cases: data.cases?.map((c) => ({
      ...c,
      caseFormData: sanitiseCaseFormData(c.caseFormData),
    })),
  };
};

export const getCasesByResident = (mosaic_id, params) =>
  getCases({ mosaic_id, ...params });

export const getCaseByResident = async (mosaic_id, case_id, params) => {
  const data = await getCases({ mosaic_id, ...params });
  return data.cases?.find(({ recordId }) => recordId === case_id);
};

export const addCase = async (formData) => {
  const { data } = await axios.post(`${ENDPOINT_API}/cases`, formData, {
    headers: { 'Content-Type': 'application/json', 'x-api-key': AWS_KEY },
  });
  return { ref: data?.['_id'] };
};
